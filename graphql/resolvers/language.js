const mongoose = require('mongoose');
const Language = require("../../models/language");

const resolver = {
    getDefaultLanguage: async () => {
        return await Language.findOne({ code: "EN" });
    },
    getLanguageById: async (id) => {
        return await Language.findById(id);
    }
}

module.exports = resolver;