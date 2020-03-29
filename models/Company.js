const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CompanySchema = new Schema({
  
    companyDetails: {
        companyName: {
            type: String,
            required: true,
            unique: true
        },
        contactPerson: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        emailID: {
            type: String,
            required: true
        }
    },
    jobDetails: {
        jobProfile: {
            type: String
        },
        domain: {
            type: String
        },
        jobRole: {
            type: String
        },
        jobLocation: {
            type: String
        },
        jobDescription: {
            type: String
        },
        linkToJD: {
            type: String
        },
        stipend: {
            type: String
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
                bonds: {
                    type: String
                },
                otherAllowances: {
                    type: String
                }
            }
        }
    },
    eligibility: {
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
            type: String
        },
        deadBacklogs: {
            type: String
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
    requirements: {
        numPanels: {
            type: String
        },
        infrastructure: {
            type: String
        },
        other: {
            type: String
        }
    },
    otherInfoForStudents: {
        type: String,
        required: true
    }
});


module.exports = Company = mongoose.model('Company', CompanySchema);




