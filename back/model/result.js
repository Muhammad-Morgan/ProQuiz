const mongoose = require('mongoose');

const myResult = new mongoose.Schema({
    myID: String, 
    quizName: String, 
    name: String, 
    result: {},
    mistakes: {}

});

const Result = mongoose.model('Result', myResult);

module.exports= Result;