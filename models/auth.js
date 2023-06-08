const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
    taskexId: {
        type: String,
        required: true
    },
    taskexPassword: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Auth', authSchema);