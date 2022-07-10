const mongoose = require('mongoose');
const User = require("../models/user");
const Role = require("../models/role");
const UserRole = require("../models/userRole");

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
    return next();
}