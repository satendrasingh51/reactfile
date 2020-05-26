const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new mongoose.Schema({
    neme: {
        type: String,
    },
    subject: {
        type: String,
    },
    roll: {
        type: String
    },
    postBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Student = mongoose.model('student', StudentSchema);