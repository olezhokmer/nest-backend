const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    pass: {
        type: String,
        required: false,
    },
    languageID: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema);