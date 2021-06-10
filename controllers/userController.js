const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require('bcrypt')

const addUser = async ({ name, email, password, picture }) => {
    if (!picture) picture = "/images/avatar.png"
    let emailRegex = /.+@.+[.].+/
    if (!emailRegex.test(email)) {
        return {status: false, result: 'Invalid Email ID'}
    }
    if (!name) return { status: false, result: 'Name is required'}
    if (!password) return { status: false, result: 'Password is required'}

    let hash = await bcrypt.hash(password, 10)
    
    try {
        const newUser = new User({ name, email, password: hash, picture })
        let savedUser = await newUser.save()
        return { status: true, result: savedUser}
    }
    catch(e) {
        return { status: false, result: "Error" + e.message }
    }
}

const getUsers = async () => {
    let users = await User.find()
    return users
}

const login = async ({ email, password }) => {
    let user = await User.findOne({ email })
    if (!user) return { status: false, result: 'User not found' }
    if (await bcrypt.compare(password, user.password)) {
        return { status: true, result: user}
    }
    else return { status: false, result: 'Wrong Password'}
}

module.exports = {
    addUser,
    login,
    getUsers
}