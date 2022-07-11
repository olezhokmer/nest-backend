const mongoose = require('mongoose');
const Language = require("../../models/language");
const ErrorType = require("../../models/errorType");
const ErrorSchema = require("../../models/error");
const errorCodes = require("../../util/errorCodes");
module.exports = {
    getError: async (languageID, errorTypeVal) => {
        const valid = Object.values(errorCodes).includes(errorTypeVal);

        if(valid) {
            const errorType = await ErrorType.findOne({ type: errorTypeVal });
            const error = await ErrorSchema.findOne({ languageID, errorTypeID: errorType._id });
            const instance = new Error(error.message);

            instance.code = errorType.code;
            instance.errorType = errorType.type;
            
            return instance;
        }
    }
};