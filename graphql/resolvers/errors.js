const mongoose = require('mongoose');
const Language = require("../../models/language");
const ErrorType = require("../../models/errorType");
const ErrorSchema = require("../../models/error");
const errorCodes = require("../../util/errorCodes");

const resolver = {
    getErrorMessageByType: async (languageID, errorTypeVal) => {
        const valid = Object.values(errorCodes).includes(errorTypeVal);

        if(valid) {
            const errorType = await ErrorType.findOne({ type: errorTypeVal });
            const error = await ErrorSchema.findOne({ languageID, errorTypeID: errorType._id });
          
            return error.message;
        }     
    },

    getErrorInstance: async (languageID, errorTypeVal) => {
        const message = await resolver.getErrorMessageByType(languageID, errorTypeVal);

        return new Error(message);
    }
}

module.exports = resolver;