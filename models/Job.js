const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let JobSchema = new Schema({
    drive: {
        type: String,
        required: true,
        unique: true
    },
    profile: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    targetBatchYear: {
        type: [String]
    },
    targetCourses: {
        type: [String]
    },
    visitDate: {
        type: String
    },
    compensationOffered: {
        stipend: {
            type: Number
        },
        totalCTC: {
            type: String
        },
        breakupCTC: {
            fixed: {
                type: String
            },
            variable: {
                type: String
            },
            bonds : {
                type: String
            },
            otherAllowances: {
                type: String
            }
        }
    },
    eligibilityCriteria: {
        cutoffPercentage: {
            type: String
        },
        activeBacklogs: {
            type: String
        },
        deadBacklogs: {
            type: String
        }
    },
    selectionProcedure: {
        writtenTest: {
            type: String
        },
        onlineTest: {
            type: String
        },
        groupDiscussion: {
            type: String
        },
        technicalRound: {
            type: String
        },
        hrRound: {
            type: String
        }
    },
    otherInfoForStudents: {
        type: String,
        required: true
    },
    lastDateToRegister: {
        type: Date,
        required: true
    },
    dateOfJobPosting: {
        type: Date,
        required: true
    }
});

module.exports = Job = mongoose.model('job', JobSchema);
