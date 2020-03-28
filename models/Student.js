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
    percentageUG: {
        type: String
    },
    backlogs: {
        activeBacklogs: {
            type: Number,
            required: true
        },
        deadBacklogs: {
            type: Number,
            required: true
        }
    },
    resumeLink: {
        type: String,
        required: true
    },
    isAppearingForPlacements: {
        type: Boolean,
        required: true
    },
    isPlaced: {
        type: Boolean,
        required: true
    },
    offerDetails: [{
        companyName: {
            type: String
        },
        source: {
            type: String
        },
        role: {
            type: String
        },
        ctc: {
            type: String
        },
        isMassRecruitment: {
            type: Boolean
        }
    }] 
});

module.exports = Student = mongoose.model('student', StudentSchema);
