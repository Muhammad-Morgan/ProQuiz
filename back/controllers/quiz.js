const Quiz = require('../model/quiz')
const Result = require('../model/result')
const createName = (req, res) => {
    const { myID } = req.query;
    const { name, author, questionsAmount, quizType } = req.body;
    Quiz.create({
        name,
        author,
        questionsAmount,
        myID,
        quizType
    }).then((result) => {
        res.json({
            quizID: result._id,
            msg: 'Saved !',
            type: 'success'
        })
    }).catch(err => console.log(err))
}
const updateName = (req, res) => {
    const { _id } = req.query;
    const { name, questionsAmount, quizType } = req.body;
    Quiz.findByIdAndUpdate(_id, { name, questionsAmount, quizType }).then(() => res.json({ msg: 'saved', type: 'success' })).catch(err => console.log(err));
}
const getQuiz = (req, res) => {
    const { _id } = req.query;
    Quiz.findById(_id).then((result) => {
        res.json({
            quiz: result,
            questionsAmount: result.questionsAmount
        })
    }).catch(err => console.log(err))
}
const submitQuiz = (req, res) => {
    const { questionAndAnswer } = req.body;
    const { _id } = req.query;
    Quiz.findByIdAndUpdate(_id, { questionAndAnswer }).then(() => {
        res.json({
            msg: 'you did submit the quiz :)',
            type: 'success'
        })
    }).catch(err => console.log(err))
}
const getQuizes = (req, res) => {
    const { myID } = req.query;
    Quiz.find().then((result) => {
        const quizes = result.filter((item) => item.myID === myID)
        res.json({
            quizes
        })
    }).catch(err => console.log(err))
}
const getAllQuizes = (req, res) => {
    Quiz.find().then((result) => {
        res.json({
            quizes: result
        })
    }).catch(err => console.log(err))
}
const searchTag = (req, res) => {
    const { quizType } = req.query;
    Quiz.find().then((result) => {
        const newQuizes = result.filter((item) => item.quizType === quizType)
        res.json({
            quizes: newQuizes
        })
    }).catch(err => console.log(err))
}
const searchName = (req, res) => {
    const { searchLetter } = req.query;
    Quiz.find().then((result) => {
        const returnLetter = result.filter((item) => item.name.includes(searchLetter.toLowerCase()))
        res.json({ quizes: returnLetter });
    }).catch(err => console.log(err))
}
const submitMyQuiz = (req, res) => {
    const { _id } = req.query;
    const {
        myID,
        name,
        quizName,
        questionAndAnswer
    } = req.body;
    Quiz.findById(_id).then((findResult) => {
        const resultArray = []
        for (let i = 0; i < findResult.questionAndAnswer.length; i++) {
            resultArray.push(findResult.questionAndAnswer[i]?.answers.find((item, index) => {
                if ((questionAndAnswer[i]?.answers[index]?.choose) && (item.isTrue !== questionAndAnswer[i]?.answers[index]?.isTrue)) {
                    return { isTrue: item.isTrue }
                }
            }))
        }
        const resultActualArray = resultArray.filter((item) => item !== undefined)
        const resultValue = (findResult.questionAndAnswer.length - resultActualArray.length) * 10
        const result = {
            resultValue,
            ref: findResult.questionAndAnswer.length * 10
        }
        const mistakeArray = [];
        let rightAns = [];
        let rightAnsCon = [];
        for (let i = 0; i < findResult.questionAndAnswer.length; i++) {
            mistakeArray.push(findResult.questionAndAnswer[i]?.answers.find((item, index) => {
                if ((questionAndAnswer[i]?.answers[index]?.choose) && (item.isTrue !== questionAndAnswer[i]?.answers[index]?.isTrue)) {
                    rightAns.push(findResult.questionAndAnswer[i]?.answers.find((iT) => iT.isTrue === true))
                    rightAnsCon = rightAns.map((item) => {
                        return item.answer
                    })
                    const wrongAnswer = questionAndAnswer[i]?.answers[index]?.answer
                    return { wrongAnswer }
                }
            }))
        }
        const lastStepMistake = mistakeArray?.map((item) => {
            return item?.answer
        })
        const actualMistakeArray = lastStepMistake.filter((item) => item !== undefined);

        const answersObj = {
            rightAnsCon,
            actualMistakeArray
        }
        Result.create({
            myID,
            name,
            quizName,
            result,
            mistakes: answersObj
        }).then((result) => res.json({
            quizID: result._id,
            msg: 'done! check your results...',
            type: 'success'
        })).catch(err => console.log(err))
    }).catch(err => console.log(err))
}
module.exports = {
    createName,
    getQuiz,
    submitQuiz,
    getQuizes,
    updateName,
    getAllQuizes,
    searchTag,
    searchName,
    submitMyQuiz
}