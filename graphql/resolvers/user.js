const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const User = require("../../models/user");
const Role = require("../../models/role");
const UserRole = require("../../models/userRole");
const constants = require("../../util/constants");
const errorCodes = require("../../util/errorCodes");
const roleValues = require("../../util/roleValues");
const errors = require("../errors/errors");
const languagesResolver = require("./language");

const resolver = {
    getUserRoles: async (id) => {
        const userRoles = await UserRole.find({ userID: id });
        const roleIds = userRoles.map(ur => ur.roleID);
        const roles = await Role.find({ _id: { $in: roleIds } });

        return roles;
    },
    findUserByID: async (id) => {
        return await User.findById(id);
    },
    findOneByEmail: async (email) => {
        return await User.findOne({ email });
    },
    createUser: async (args, req) => {
        const userFound = await resolver.findOneByEmail(args.input.email);

        if(userFound) {
            throw await errors.getError(req.lang._id, errorCodes.userExists);
        }
        const hash = bcrypt.hashSync(args.input.pass, constants.saltRound);
        const user = new User({
            firstName: args.input.firstName,
            lastName: args.input.lastName,
            email: args.input.email,
            pass: hash,
            languageID: req.lang._id,
            date: new Date(),
        });
        const created = await user.save();

        const role = await Role.findOne({ name: roleValues.user });
        const userRole = new UserRole({
            userID: created._id,
            roleID: role._id,
        });
        await userRole.save();

        return resolver.signJwt(created);
    },
    login: async (args, req) => {
        const user = await resolver.findOneByEmail(args.input.email);
        if(!user) {
            throw await errors.getError(req.lang._id, errorCodes.userNotFound);
        }

        const result = bcrypt.compareSync(args.input.pass, user.pass);
        if(!result) {
            throw await errors.getError(req.lang._id, errorCodes.incorrectPassword);
        }

        return resolver.signJwt(user);
    },
    signJwt: (user) => {
        return { 
            token: jwt.sign({ _id: user._id, date: new Date() }, process.env.JWT_SECRET)
        };
    },
    setLang: async (args, req) => {
        if(req.userData) {
            const langId = args.input._id;
            const lang = await languagesResolver.getLanguageById(langId);

            if(lang) {
                await User.updateOne({ _id: req.userData._id }, { languageID: lang._id });
            } else {
                throw await errors.getError(req.lang._id, errorCodes.langNotFound);
            }

            return lang;
        } else {
            throw await errors.getError(req.lang._id, errorCodes.unauthorized);
        }
    }
};

module.exports = resolver;