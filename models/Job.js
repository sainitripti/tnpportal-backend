const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let JobSchema = new Schema({
    profile: {
        type: String
    },
    domain: {
        type: String
    },
    role: {
        type: String
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    stipend: {
        type: Number
    },
    compensationOffered: {
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
        targetBatchYear: {
            type: String
        },
        targetCourses: {
            type: [String]
        },
        cutoffPercentage: {
            type: String
        },
        activeBacklogs: {
            type: Number
        },
        deadBacklogs: {
            type: Number
        }
    },
    selectionProcedure: {
        prefferedVisitDateOrWeek: {
            type: String
        },
        hasWrittenTest: {
            type: Boolean
        },
        hasOnlineTest: {
            type: Boolean
        },
        hasGD: {
            type: Boolean
        },
        hasTechnicalRound: {
            type: Boolean
        },
        hasHRRound: {
            type: Boolean
        }
    },
    otherInfoForStudents: {
        type: String
    },
    lastDateToRegister: {
        type: Date
    },
    dateOfJobPosting: {
        type: Date
    }
});

module.exports = Job = mongoose.model('job', JobSchema);
