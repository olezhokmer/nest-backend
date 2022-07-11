const mongoose = require('mongoose');
const User = require("../models/user");
const userResolver = require("../graphql/resolvers/user");

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if(!authHeader) {
        req.userData = null;
        return next();
    }

    let decoded;

    try {
        decoded = jwt.verify(authHeader, process.env.JWT_SECRET)
    } catch (error) {
        req.userData = null;
        return next();
    }

    req.userData = await User.findById(decoded._id);
    if(req.userData) {
        req.userData.roles = await userResolver.getUserRoles(decoded._id);
    }
    return next();
}