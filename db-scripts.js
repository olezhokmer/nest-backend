const mongoose = require('mongoose');
const ProjectRequest = require("./models/projectRequest");
const User = require("./models/user");
const Language = require("./models/language");
const ErrorSchema = require("./models/error");
const ErrorType = require("./models/errorType");
const Role = require("./models/role");
const UserRole = require("./models/userRole");

const errorCodes = require("./util/errorCodes");
const roleValues = require("./util/roleValues");

module.exports = async () => {

}

async function insertError(lang, errorType, code, message) {
    const lan = await Language.findOne({ code: lang });
    const type = await (new ErrorType({ type: errorType, code })).save();

    return await (new ErrorSchema({
        errorTypeID: type._id,
        languageID: lan._id,
        message
    })).save();
}