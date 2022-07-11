const languageResolver = require("../graphql/resolvers/language");

module.exports = async (req, res, next) => {
    if(req.userData) {
        req.lang = await languageResolver.getLanguageByCode(req.userData.languageID);
    } else {
        const langCode = req.get("Lang");

        if(langCode) {
            req.lang = await languageResolver.getLanguageByCode(langCode);
        }
    }

    if(!req.lang) {
        req.lang = await languageResolver.getDefaultLanguage();
    }

    return next();
}