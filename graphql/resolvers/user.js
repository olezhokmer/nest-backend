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
const errorResolver = require("./errors");
const languagesResolver = require("./language");

const resolver = {
    findUserByID: async (id) => {
        return await User.findById(id);
    },
    findOneByEmail: async (email) => {
        return await User.findOne({ email });
    },
    createUser: async (args) => {
        const defaultLang = await languagesResolver.getDefaultLanguage();
        const userFound = await resolver.findOneByEmail(args.input.email);

        if(userFound) {
            throw await errorResolver.getErrorInstance(defaultLang._id, errorCodes.userExists);
        }
        const hash = bcrypt.hashSync(args.input.pass, constants.saltRound);
        const user = new User({
            firstName: args.input.firstName,
            lastName: args.input.lastName,
            email: args.input.email,
            pass: hash,
            languageID: defaultLang._id,
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
    login: async (args) => {
        const defaultLang = await languagesResolver.getDefaultLanguage();
        const user = await resolver.findOneByEmail(args.input.email);
        if(!user) {
            throw await errorResolver.getErrorInstance(defaultLang._id, errorCodes.userNotFound);
        }

        const result = bcrypt.compareSync(args.input.pass, user.pass);
        if(!result) {
            throw await errorResolver.getErrorInstance(defaultLang._id, errorCodes.incorrectPassword);
        }

        return resolver.signJwt(user);
    },
    signJwt: (user) => {
        return { 
            token: jwt.sign({ _id: user._id, date: new Date() }, process.env.JWT_SECRET)
        };
    }
};

module.exports = resolver;