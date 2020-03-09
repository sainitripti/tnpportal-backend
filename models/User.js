const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    enrollmentNum: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "STUDENT"
    }
});

module.exports = User = mongoose.model('user', UserSchema);
