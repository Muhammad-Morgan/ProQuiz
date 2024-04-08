import React, { createContext, useContext, useReducer } from 'react'
import reducer from './reducer'
const AppContext = createContext()
const defaultState = {
    loading: false,
    questionIndex: 0,
    answerIndex: 0,
    questionQuantity: 0,
    questionAndAnswer: [],
    questionObj: {
        question: '',
        answers: []
    },
    answerObj: {
        answer: '',
        isTrue: false
    },
    userInfo: {
        myID: '',
        name: '',
        type: ''
    },
    alert: {
        msg: '',
        type: '',
        condition: false
    },
    sideCondition: false
}
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const startLoading = () => dispatch({ type: 'startLoading' })
    const endLoading = () => dispatch({ type: 'endLoading' })
    const showAlert = ({ msg, type }) => dispatch({
        type: 'showAlert',
        payload: { msg, type }
    })
    const hideAlert = () => dispatch({
        type: 'hideAlert'
    })
    const updateInfo = ({ name, type, myID }) => dispatch({
        type: 'updateInfo',
        payload: {
            name,
            type,
            myID
        }
    })
    const handleChangeQuestion = (e) => {
        const value = e.target.value;
        dispatch({
            type: 'handleChangeQuestion',
            payload: value
        })
    }
    const handleChangeAnswer = (e) => {
        const value = e.target.value;
        dispatch({
            type: 'handleChangeAnswer',
            payload: value
        })
    }
    const handleCheck = (isTrue) => {
        if (isTrue === 'true') {
            dispatch({
                type: 'handleChangeTrue',
                payload: 'true'
            })
        } else {
            dispatch({
                type: 'handleChangeTrue',
                payload: 'false'
            })
        }
    }
    const handleSave = (e) => {
        e.preventDefault();
        dispatch({
            type: 'handleSave',
        })
    }
    const setQuestionQuantity = (amount) => {
        dispatch({
            type: 'setQuestionQuantity',
            payload: amount
        })
    }
    const setQuestionIndex = (value) => {
        dispatch({
            type: 'setQuestionIndex',
            payload: value
        })
    }
    const setAnswerIndex = (value) => {
        dispatch({
            type: 'setAnswerIndex',
            payload: value
        })
    }
    const nextQuestionF = () => {
        dispatch({
            type: 'nextQuestionF',
        })
    }
    const submitQuiz = () => dispatch({
        type: 'submitQuiz'
    })
    const saveAnswer = (theQuestion, theAnswer) => dispatch({
        type: 'saveAnswer',
        payload: {
            theQuestion,
            theAnswer
        }
    })
    const saveQuestion = () => dispatch({
        type: 'saveQuestion',
    })
    const submitMyQuiz = () => dispatch({
        type: 'submitMyQuiz'
    })
    return (
        <AppContext.Provider value={{
            ...state,
            showAlert,
            hideAlert,
            updateInfo,
            handleChangeAnswer,
            handleChangeQuestion,
            handleCheck,
            handleSave,
            setQuestionQuantity,
            setQuestionIndex,
            setAnswerIndex,
            nextQuestionF,
            submitQuiz,
            startLoading,
            endLoading,
            saveAnswer,
            saveQuestion,
            submitMyQuiz
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}
export { AppContext, AppProvider }