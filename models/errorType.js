const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ErrorTypeSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('ErrorType', ErrorTypeSchema);