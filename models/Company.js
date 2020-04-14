const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CompanySchema = new Schema({
  
    companyDetails: {
        companyName: {
            type: String,
            required: true
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
        hRRound: {
            type: String
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




