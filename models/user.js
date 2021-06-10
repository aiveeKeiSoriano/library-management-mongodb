const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    picture: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const UserModel = new mongoose.model('User', UserSchema)

module.exports = UserModel