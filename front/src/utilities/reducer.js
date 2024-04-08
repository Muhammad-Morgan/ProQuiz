const reducer = (state, action) => {
    if(action.type === 'startLoading'){
        return {
            ...state,
            loading: true
        }
    }
    if(action.type === 'endLoading'){
        return {
            ...state,
            loading: false
        }
    }
    if (action.type === 'showAlert') {
        return {
            ...state,
            alert: {
                ...state.alert,
                msg: action.payload.msg,
                type: action.payload.type,
                condition: true
            }
        }
    }
    if (action.type === 'hideAlert') {
        return {
            ...state,
            alert: {
                ...state.alert,
                condition: false,
            }
        }
    }
    if (action.type === 'updateInfo') {
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                name: action.payload.name,
                myID: action.payload.myID,
                type: action.payload.type,
            }
        }
    }
    if (action.type === 'handleChangeQuestion') {
        return {
            ...state,
            questionObj: {
                ...state.questionObj,
                question: action.payload
            }
        }
    }
    if (action.type === 'handleChangeAnswer') {
        return {
            ...state,
            answerObj: {
                ...state.answerObj,
                answer: action.payload
            }
        }
    }
    if (action.type === 'handleChangeTrue') {
        if (action.payload === 'true') {
            return {
                ...state,
                answerObj: {
                    ...state.answerObj,
                    isTrue: true
                }
            }

        } else {
            return {
                ...state,
                answerObj: {
                    ...state.answerObj,
                    isTrue: false
                }
            }

        }
    }
    if (action.type === 'setQuestionQuantity') {
        return {
            ...state,
            questionQuantity: action.payload
        }
    }
    if (action.type === 'handleSave') {
        if (state.answerIndex === 3) {
            return {
                ...state,
                questionObj: {
                    ...state.questionObj,
                    answers: [
                        ...state.questionObj.answers,
                        state.answerObj
                    ]
                },
                answerObj: {
                    ...state.answerObj,
                    answer: '',
                    isTrue: false
                },
                answerIndex: state.answerIndex + 1,
            }
        } else {
            return {
                ...state,
                questionObj: {
                    ...state.questionObj,
                    answers: [
                        ...state.questionObj.answers,
                        state.answerObj
                    ]
                },
                answerObj: {
                    ...state.answerObj,
                    answer: '',
                    isTrue: false
                },
                answerIndex: state.answerIndex + 1
            }
        }


    }
    if (action.type === 'nextQuestionF') {
        return {
            ...state,
            questionAndAnswer: [
                ...state.questionAndAnswer,
                state.questionObj
            ],
            questionObj: {
                ...state.questionObj,
                question: '',
                answers: []
            },
            answerIndex: 0,
            questionIndex: state.questionIndex + 1
        }
    }
    if (action.type === 'submitQuiz') {
        return {
            ...state,
            questionAndAnswer: [],
            questionIndex: 0
        }
    }
    if(action.type === 'saveAnswer'){
        return {
            ...state,
            questionObj: {
                ...state.questionObj,
                question: action.payload.theQuestion,
                answers: action.payload.theAnswer
            },
        }
    }
    if(action.type === 'saveQuestion'){
        return {
            ...state,
            questionAndAnswer: [
                ...state.questionAndAnswer,
                state.questionObj
            ],
            questionObj: {
                ...state.questionObj,
                question: '',
                answers: []
            },
            questionIndex: state.questionIndex + 1
        }
    }
    if (action.type === 'submitMyQuiz') {
        return {
            ...state,
            questionAndAnswer: [],
            questionIndex: 0,
            alert: {
                ...state.alert,
                msg: 'wait for the results...',
                type: 'success',
                condition: true
            }
        }
    }
    return state
}
export default reducer;