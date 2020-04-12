const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DriveWiseRegistrationSchema = new Schema({
    drive: {
        type: String,
        required: true
    },
    arEnrollmentNum: {
        type: [String],
        required: true
    }
});

module.exports = DriveWiseRegistration = mongoose.model('drive-wise-registration', DriveWiseRegistrationSchema);
