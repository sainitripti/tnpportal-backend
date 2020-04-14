const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StudentSchema = new Schema({
    enrollmentNum: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    emailID: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    graduationYear: {
        type: String,
        required: true
    },
    currentPercentage: {
        type: String,
        required: true
    },
    percentage10: {
        type: String,
        required: true
    },
    percentage12: {
        type: String,
        required: true
    }, 
    activeBacklogs: {
        type: String,
        required: true
    },
    deadBacklogs: {
        type: String,
        required: true
    }
});

module.exports = Student = mongoose.model('student', StudentSchema);
