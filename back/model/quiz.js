const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    name: String,
    myID: String,
    questionsAmount: Number,
    author: String,
    quizType: String,
    questionAndAnswer: [
        {
            question: String,
            answers: [
                {
                    answer: String,
                    isTrue: Boolean,
                }
            ]
        }
    ]
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;