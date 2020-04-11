const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RegistrationSchema = new Schema({
    drive: {
        type: String,
        required: true
    },
    enrollmentNum: {
        type: String,
        required: true
    }
});

module.exports = Registration = mongoose.model('registration', RegistrationSchema);
