const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({


    username: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },

    fName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true

    },
    surname: {
        type: String,
        trim: true
       
    },
    password: {
        type: String,
        required: true,
        trim: true,
        lowercase: true

    },

    oncreate: {
        type: Date,
        default: Date.now,

    }

});


const User = mongoose.model("User", UserSchema);
module.exports = User;