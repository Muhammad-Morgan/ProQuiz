import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../utilities/Context'
import { useNavigate } from 'react-router-dom'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loading from '../Loading'
import axios from 'axios'
import './quizcomp.css'
const QuizComp = () => {
    const navigate = useNavigate();
    const {
        loading,
        startLoading,
        endLoading,
        submitQuiz,
        questionAndAnswer,
        questionQuantity,
        answerIndex,
        questionIndex,
        showAlert,
        questionObj,
        answerObj,
        handleChangeAnswer,
        handleChangeQuestion,
        handleCheck,
        handleSave,
        setQuestionQuantity,
        nextQuestionF,
        userInfo
    } = useGlobalContext();
    const [nextQuestion, setNextQuestion] = useState(false)
    const [answerCondition, setAnswerCondition] = useState(false)
    const [submitCondition, setSubmitCondition] = useState(false)
    const handleSaveQuestion = (e) => {
        e.preventDefault();
        setAnswerCondition(true);
    }
    useEffect(() => {
        startLoading()
        const _id = localStorage.getItem('selectedQuizID')
        axios.get(`https://pro-quiz-ser.vercel.app/quiz/getquiz?_id=${_id}`).then(({ data }) => {
            const { questionsAmount } = data;
            setQuestionQuantity(questionsAmount)
            endLoading()
        }).catch(err => console.log(err))
    }, [userInfo.name])
    useEffect(() => {
        if (questionIndex === questionQuantity) {
            setSubmitCondition(true);
        }
        if (questionIndex === 0) {
            setSubmitCondition(false);
        }
    }, [questionIndex])
    useEffect(() => {
        if (answerIndex === 4) {
            setNextQuestion(true);
        } else {
            setNextQuestion(false)
        }
    }, [answerIndex])
    if(loading){
        return <Loading />
    }
    return (
        <div className='ques-container'>
            <section className='quest-container shadow rounded'>
                <div
                class="d-flex justify-content-around mb-3">
                    <h4
                        style={{
                            marginInline: 'auto',
                            width: '75%',
                        }}
                        className='text-start fs-3 fw-normal'>Write question...</h4>
                </div>
                <input
                    style={{
                        marginInline: 'auto',
                        width: '75%',
                        marginBottom: '2rem'
                    }}
                    type="text"
                    id="question"
                    value={questionObj.question}
                    onChange={handleChangeQuestion}
                    class="form-control"
                />
                <div>
                    <div class="d-flex justify-content-center">
                        {!answerCondition &&
                            <button
                                onClick={handleSaveQuestion}
                                className='my-save gap-3 d-flex align-items-center rounded shadow'>Save
                                <FontAwesomeIcon icon={faArrowRightLong} className='fa-md' />
                            </button>
                        }
                    </div>
                </div>
            </section>
            {
                answerCondition &&
                <section className='quest-container shadow rounded'>
                    <h4
                        style={{
                            marginInline: 'auto',
                            width: '75%',
                        }}
                        className='text-start fw-normal'>Write answers</h4>
                    <input
                        style={{
                            marginInline: 'auto',
                            width: '75%'
                        }}
                        value={answerObj.answer}
                        onChange={handleChangeAnswer}
                        type="text"
                        name="answer"
                        id="answer"
                        class="form-control mb-4"
                    />
                    <article className='d-flex mb-4 align-items-center justify-content-center gap-3'>
                        <p className='fw-light fs-4 mb-0'>Choose if this is the right one</p>
                        <div className='d-flex gap-3'>
                            <button
                                onClick={() => handleCheck('true')}
                                className='check-box1 shadow-sm rounded'>True</button>
                            <button
                                onClick={() => handleCheck('false')}
                                className='check-box2 shadow-sm rounded'>False</button>
                        </div>
                    </article>
                    <div class="d-flex justify-content-center">
                        {(!submitCondition && !nextQuestion) &&
                            <button
                                onClick={handleSave}
                                type='button'
                                className='my-send gap-3 d-flex align-items-center rounded shadow'>Save
                                <FontAwesomeIcon icon={faArrowRightLong} className='fa-md' />
                            </button>
                        }
                        {(!submitCondition && nextQuestion) &&
                            <button
                                onClick={nextQuestionF}
                                type='button'
                                className='my-next gap-3 d-flex align-items-center rounded shadow'>{(questionIndex === questionQuantity - 1) ? 'Save' : 'Next Question'}
                                <FontAwesomeIcon icon={faArrowRightLong} className='fa-md' />
                            </button>
                        }
                        {(submitCondition && !nextQuestion) &&
                            <button
                                onClick={() => {
                                    const quizID = localStorage.getItem('selectedQuizID')
                                    axios.put(`https://pro-quiz-ser.vercel.app/quiz/submitquiz?_id=${quizID}`, { questionAndAnswer }).then(({ data }) => {
                                        const { msg, type } = data
                                        showAlert({
                                            msg,
                                            type
                                        })
                                        submitQuiz()
                                        localStorage.removeItem('selectedQuizID')
                                        navigate('/myquizes')
                                    }).catch(err => console.log(err));
                                }}
                                type='button'
                                className='my-submit gap-3 d-flex align-items-center rounded shadow'>Submit
                                <FontAwesomeIcon icon={faArrowRightLong} className='fa-md' />
                            </button>
                        }
                    </div>
                </section>
            }

        </div>
    )
}

export default QuizComp
