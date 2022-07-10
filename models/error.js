const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ErrorSchema = new Schema({
    errorTypeID: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    languageID: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Error', ErrorSchema);