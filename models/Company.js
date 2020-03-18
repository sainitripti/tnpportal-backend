const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    jobRole: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        required: true
    },
    package: {
        type: String,
        required: true
    },  
    eligibility: {
        type: String,
        required: true
    },
    other: {
        type: String
    }
});

module.exports = Company = mongoose.model('Company', CompanySchema);
