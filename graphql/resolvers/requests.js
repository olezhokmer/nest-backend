const mongoose = require('mongoose');
const ProjectRequest = require("../../models/projectRequest");

const resolver = {
    getProjectRequests: async (args, req) => {
        if(req.userData) {
            return await ProjectRequest.find();
        } else return [];
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