const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    mobile: {
        type: String,
    },
    image: {
        type: String
    },
    email: {
        type: String
    },
    sig: {
        type: String
    },
    pdf: {
        type: String
    },
    imagepath: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);