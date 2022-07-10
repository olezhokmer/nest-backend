const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectReuestSchema = new Schema({
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
        required: true,
    },
    businessRequirements: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: true
    },
    checked: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model('ProjectRequest', projectReuestSchema);
