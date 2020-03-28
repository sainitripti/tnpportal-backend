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
    stipend: {
        type: Number,
        required: true
    },
    compensationOffered: {
        totalCTC: {
            type: String,
            required: true
        },
        breakupCTC: {
            fixed: {
                type: String,
                required: true
            },
            variable: {
                type: String,
                required: true
            },
            bonds : {
                type: String,
                required: true
            },
            otherAllowances: {
                type: String,
                required: true
            }
        }
    },
    eligibilityCriteria: {
        targetBatchYear: {
            type: [String],
            required: true
        },
        targetCourses: {
            type: [String],
            required: true
        },
        cutoffPercentage: {
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
    },
    selectionProcedure: {
        visitDate: {
            type: String,
            required: true
        },
        hasWrittenTest: {
            type: Boolean,
            required: true
        },
        hasOnlineTest: {
            type: Boolean,
            required: true
        },
        hasGD: {
            type: Boolean,
            required: true
        },
        hasTechnicalRound: {
            type: Boolean,
            required: true
        },
        hasHRRound: {
            type: Boolean,
            required: true
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
