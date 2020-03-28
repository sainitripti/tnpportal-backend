const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ResultSchema = new Schema({
    companyName: {
        type: String,
        unique: true,
        required: true
    },
    dateOfAnnouncement: {
        type: Date,
        required: true
    },
    numTotalSelects: {
        type: Number,
        required: true
    },
    numIntern: {
        type: Number,
        required: true
    },
    numFTE: {
        type: Number,
        required: true
    },
    ctcIntern: {
        type: Number,
        required: true
    },
    ctcFTE: {
        type: String,
        required: true
    },
    isMassRecruitment: {
        type: Boolean,
        required: true
    },
    arIntern: {
        type: [String]
    },
    arFTE: {
        type: [String]
    },
    profile: {
        type: String,
        required: true
    }
});

module.exports = Result = mongoose.model('result', ResultSchema);
