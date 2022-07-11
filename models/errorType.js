const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ErrorTypeSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('ErrorType', ErrorTypeSchema);