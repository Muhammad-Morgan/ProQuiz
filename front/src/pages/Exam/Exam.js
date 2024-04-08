import React, { useEffect, useState } from 'react'
import './exam.css'
import { useGlobalContext } from '../../utilities/Context'
import { authorize } from '../../utilities/authorize'
import { getQuiz } from '../../utilities/quizes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading'
import axios from 'axios'
const Exam = () => {
    const navigate = useNavigate()
    const { _id } = useParams();
    const {
        showAlert,
        updateInfo,
        userInfo,
        questionIndex,
        loading,
        questionAndAnswer,
        saveAnswer,
        saveQuestion,
        questionQuantity,
        setQuestionQuantity,
    } = useGlobalContext()
    const [check, setCheck] = useState([
        {
            answer: '',
            isTrue: false,
            choose: false
        },
        {
            answer: '',
            isTrue: false,
            choose: false
        },
        {
            answer: '',
            isTrue: false,
            choose: false
        },
        {
            answer: '',
            isTrue: false,
            choose: false
        },
    ]);
    const [submitCondition, setSubmitCondition] = useState(false);
    const [myQuiz, setMyQuiz] = useState({})
    const handleClick = (e) => {
        e.preventDefault();
        saveQuestion()
        setCheck([
            {
                answer: '',
                isTrue: false,
                choose: false
            },
            {
                answer: '',
                isTrue: false,
                choose: false
            },
            {
                answer: '',
                isTrue: false,
                choose: false
            },
            {
                answer: '',
                isTrue: false,
                choose: false
            },
        ]);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://pro-quiz-ser.vercel.app/quiz/submitmyquiz?_id=${_id}`, {
            name: userInfo.name,
            myID: userInfo.myID,
            quizName: myQuiz.name,
            questionAndAnswer: questionAndAnswer
        }).then(({ data }) => {
            const { type, msg, quizID } = data;
            showAlert({ type, msg });
            navigate(`/result/${quizID}`)
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        setQuestionQuantity(0)
    }, []);
    useEffect(() => {
        getQuiz(_id, setMyQuiz, setQuestionQuantity)
    }, [userInfo.name])
    useEffect(() => {
        authorize({ updateInfo, navigate, showAlert });
    }, [userInfo.name])
    useEffect(() => {
        if (questionIndex === questionQuantity) {
            setSubmitCondition(true);
        } if (questionIndex === 0) {
            setSubmitCondition(false);
        }
    }, [userInfo.name, questionIndex]);
    if (loading || !myQuiz.questionAndAnswer) return <Loading />
    return (
        <div className='exam-page'>
            <article className='exam-center'>
                <section className='exam-card rounded shadow'>
                    <h2 className='text-white text-capitalize'>{myQuiz.name}</h2>
                    <p className='fw-light mb-4 text-white'>{submitCondition ? 'submit your quiz !' : 'Choose only one answer...'}</p>
                    <div className='question-container'>
                        <main>
                            <p className='text-white fs-4 mb-4'>{myQuiz.questionAndAnswer[questionIndex]?.question}</p>
                            <ul className='answers-list'>
                                {
                                    myQuiz.questionAndAnswer[questionIndex]?.answers.map((item, index) => {
                                        const { answer } = item;
                                        return (
                                            <li
                                                key={index}
                                                className='answer-item'>
                                                <div>
                                                    <input
                                                        className="btn-check"
                                                        type="radio"
                                                        id={`radio${index}`}
                                                        name="radio"
                                                        value={check[index].isTrue}
                                                        onClick={(e) => {
                                                            let trueCond = false;
                                                            const value = JSON.parse(e.target.value);
                                                            const tempCheck = check.map((item, inIndex) => {
                                                                if (index === inIndex && value === true) {
                                                                    trueCond = true;
                                                                } else {
                                                                    if (item.isTrue) {
                                                                        return item
                                                                    }
                                                                }
                                                            })
                                                            const tTempCheck = tempCheck.filter((item)=>item !== undefined)
                                                            if (tTempCheck.length > 0) {
                                                                showAlert({
                                                                    msg: 'cannot choose more one answer',
                                                                    type: 'danger'
                                                                })
                                                            } else {
                                                                if (value === true && trueCond) {
                                                                    const newCheck = check.map((item, inIndex) => {
                                                                        if (index === inIndex) {
                                                                            item.isTrue = false
                                                                        }
                                                                        return item
                                                                    })
                                                                    setCheck(newCheck)
                                                                    const nnewCheck = check.map((item, index) => {
                                                                        item.answer = myQuiz?.questionAndAnswer[questionIndex]?.answers[index]?.answer;
                                                                        return item
                                                                    })
                                                                    setCheck(nnewCheck)
                                                                    const addChoose = check.map((item, inIndex) => {
                                                                        if (index === inIndex) {
                                                                            item.choose = false
                                                                        }
                                                                        return item
                                                                    })
                                                                    setCheck(addChoose)
                                                                    const theQuestion = myQuiz.questionAndAnswer[questionIndex].question;
                                                                    const theAnswer = check
                                                                    saveAnswer(theQuestion, theAnswer)

                                                                } if (value === false) {
                                                                    const newCheck = check.map((item, inIndex) => {
                                                                        if (index === inIndex) {
                                                                            item.isTrue = true
                                                                        }
                                                                        return item
                                                                    })
                                                                    setCheck(newCheck)
                                                                    const nnewCheck = check.map((item, index) => {
                                                                        item.answer = myQuiz?.questionAndAnswer[questionIndex]?.answers[index]?.answer;
                                                                        return item
                                                                    })
                                                                    setCheck(nnewCheck)
                                                                    const addChoose = check.map((item, inIndex) => {
                                                                        if (index === inIndex) {
                                                                            item.choose = true
                                                                        }
                                                                        return item
                                                                    })
                                                                    setCheck(addChoose)
                                                                    const theQuestion = myQuiz.questionAndAnswer[questionIndex].question;
                                                                    const theAnswer = check
                                                                    saveAnswer(theQuestion, theAnswer)

                                                                }
                                                            }
                                                        }}
                                                    />
                                                    <label className={`my-check rounded shadow-sm ${check[index].isTrue ? 'checked' : ''}`} htmlFor={`radio${index}`}>
                                                        <FontAwesomeIcon icon={faCheck} className='fa-lg' />                                                </label>
                                                </div>
                                                <p className='text-white mb-0 fs-5'>{answer}</p>

                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className='nxt-btn'>
                                {submitCondition ? (
                                    <button
                                        onClick={handleSubmit}
                                        type="button" className="my-submit rounded shadow-sm">Submit</button>
                                ) : (
                                    <button
                                        onClick={handleClick}
                                        type="button" className="my-save rounded shadow-sm">Next</button>
                                )}
                            </div>
                        </main>
                    </div>
                </section>
            </article>
        </div>
    )
}

export default Exam
