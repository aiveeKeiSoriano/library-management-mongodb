const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require('bcrypt')

const addUser = async ({ name, email, password, picture }) => {
    if (!picture) picture = "avatar.png"
    let emailRegex = /.+@.+[.].+/
    if (!emailRegex.test(email)) {
        return { status: false, result: { message: 'Invalid Email ID' } }
    }
    if (!name) return { status: false, result: { message: 'Name is required' } }
    if (!password) return { status: false, result: { message: 'Password is required' } }

    let hash = await bcrypt.hash(password, 10)
    
    try {
        const newUser = new User({ name, email, password: hash, picture })
        let savedUser = await newUser.save()
        return { status: true, result: savedUser}
    }
    catch(e) {
        return { status: false, result: { message: "Error" + e.message } }
    }
}

const getUsers = async () => {
    let users = await User.find()
    return users
}

const login = async ({ email, password }) => {
    let user = await User.findOne({ email })
    if (!user) return { status: false, result: { message: 'User not found' } }
    if (await bcrypt.compare(password, user.password)) {
        return { status: true, result: user}
    }
    else return { status: false, result: { message: 'Wrong Password' } }
}

module.exports = {
    addUser,
    login,
    getUsers
}