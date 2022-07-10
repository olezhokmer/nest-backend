const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRoleSchema = new Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    roleID: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
});

module.exports = mongoose.model('UserRole', userRoleSchema);