const mongoose = require('mongoose');
const ProjectRequest = require("../../models/projectRequest");

const errors = require("../errors/errors");
const errorCodes = require("../../util/errorCodes");
const roleValues = require("../../util/roleValues");

const resolver = {
    getProjectRequests: async (args, req) => {
        if(req.userData) {
            const adminRole = req.userData.roles.find(role => role.name === roleValues.admin);
            if(!adminRole) {
                throw await errors.getError(req.lang._id, errorCodes.noPermissions);
            }

            return await ProjectRequest.find();
        } else {
            throw await errors.getError(req.lang._id, errorCodes.unauthorized);
        };
    },

    requestProject: async (args) => {
        const projectRequest = new ProjectRequest({
            firstName: args.input.firstName,
            lastName: args.input.lastName,
            email: args.input.email,
            businessRequirements: args.input.businessRequirements,
            date: new Date(),
            checked: false,
        });
        const saved = await projectRequest.save();

        return saved;
    }
}

module.exports = resolver;