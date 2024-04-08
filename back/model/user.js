const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    myID: String,
    name: String,
    email: String,
    password: String,
    location: String,
    type: String
})

const Users = mongoose.model('Users', userSchema);

module.exports = Users;