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
        type: String
    },
    branch: {
        type: String
    },
    course: {
        type: String
    },
    graduationYear: {
        type: String
    },
    currentPercentage: {
        type: String
    },
    percentage10: {
        type: String
    },
    percentage12: {
        type: String
    },
    percentageUG: {
        type: String
    },
    backlogs: {
        activeBacklogs: {
            type: Number
        },
        deadBacklogs: {
            type: Number
        }
    },
    resumeLink: {
        type: String
    },
    isAppearingForPlacements: {
        type: Boolean
    },
    isPlaced: {
        type: Boolean
    },
    offerDetails: {
        type: [{
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
    }
});

module.exports = Student = mongoose.model('student', StudentSchema);
