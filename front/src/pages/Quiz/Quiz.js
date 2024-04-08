import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../utilities/Context'
import { authorize } from '../../utilities/authorize'
import { Link, useNavigate } from 'react-router-dom'
import './quiz.css'
import axios from 'axios'
import Loading from '../../components/Loading'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Quiz = () => {
  const [quiz, setQuiz] = useState({
    name: '',
    questionsAmount: 0,
    quizType: ''
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({
      ...quiz,
      [name]: value
    })
  }
  const navigate = useNavigate();
  const { userInfo, updateInfo, showAlert,loading } = useGlobalContext();
  const handleClick = (e) => {
    e.preventDefault();
    if (quiz.name && quiz.questionsAmount) {
      axios.post(`http://localhost:5000/quiz/createname?myID=${userInfo.myID}`, {
        name: quiz.name.toLowerCase(),
        author: userInfo.name.toLowerCase(),
        questionsAmount: quiz.questionsAmount,
        quizType: quiz.quizType
      }).then(({ data }) => {
        const { type, msg, quizID } = data;
        localStorage.setItem('selectedQuizID', quizID)
        setQuiz({
          ...quiz,
          name: '',
          questionsAmount: '',
          quizType: ''
        })
        showAlert({
          type,
          msg
        });
        navigate('/question')
      }).catch(err => console.log(err))
    } else {
      showAlert({
        msg: 'fill all requirements',
        type: 'danger'
      })
    }
  }
  useEffect(() => {
    authorize({ updateInfo, showAlert, navigate })
    if (userInfo.type === 'student') {
      navigate('/allquizes')
    }
  }, [userInfo.name]);
  if(loading) return <Loading />
  return (
    <article className='quiz-container'>
      <section className='container'>
        <div className='name-comp shadow rounded'>
          <h2 className='text-center mb-4 fw-light'>Let's give this quiz a name...</h2>
          <div class="form-group mb-4">
            <div class="d-flex justify-content-center gap-2">
              <input
                style={{ width: '70%' }}
                type="text"
                name="name"
                id="name"
                className="form-control fs-4"
                value={quiz.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <hr style={{
            marginBlock: '1rem',
            maxWidth: '60%',
            marginInline: 'auto'
          }} />
          <article className='d-flex justify-content-center gap-3'>
            <h3 className='text-center mb-4 fw-light'>How many questions ?!</h3>
            <div class="form-group"
              style={{
                maxWidth: '70px'
              }}
            >
              <input
                type="number"
                name="questionsAmount"
                id="questionsAmount"
                class="form-control"
                value={quiz.questionsAmount}
                onChange={handleChange}
              />
            </div>
          </article>
          <hr style={{
            marginBlock: '1rem',
            maxWidth: '60%',
            marginInline: 'auto'
          }} />
          <article 
          style={{
            width: '90%',
            marginBottom: '3rem',
            marginInline: 'auto'
          }}
          className='d-flex justify-content-center gap-3 '>
            <h3 className='text-center mb-4 fw-light'>Choose type</h3>
            <div class="form-group"
              style={{
                width: '40%'
              }}
            >
            <div class="form-floating">
                <select 
                onChange={handleChange}
                class="form-select" 
                aria-label="Floating label select example"
                type="text"
                name="quizType"
                id="quizType"
                value={quiz.quizType}
                >
                    <option
                    style={{cursor: 'pointer',backgroundColor: '#E1DCDC'}}
                    value=""></option>
                    <option
                    style={{cursor: 'pointer',backgroundColor: '#E1DCDC'}}
                    value="math">Math</option>
                    <option
                    style={{cursor: 'pointer',backgroundColor: '#E1DCDC'}}
                    value="english">English</option>
                    <option
                    style={{cursor: 'pointer',backgroundColor: '#E1DCDC'}}
                    value="physics">Physics</option>
                    <option
                    style={{cursor: 'pointer',backgroundColor: '#E1DCDC'}}
                    value="biology">Biology</option>
                    <option
                    style={{cursor: 'pointer',backgroundColor: '#E1DCDC'}}
                    value="programming">Programming</option>
                </select>
                <label for="floatingSelect">quiz type</label>
            </div>
             
            </div>
          </article>
          <div class="d-flex justify-content-center">
            <button
              onClick={handleClick}
              style={{
                letterSpacing: '1px',
                width: '8rem'
              }}
              type="button"
              class="my-search-nav-1 fs-5 d-flex align-items-center gap-3 rounded shadow-sm">
              Save
              <FontAwesomeIcon icon={faArrowRightLong} className='fa-md' />
            </button>
          </div>
        </div>
      </section>
    </article>
  )
}

export default Quiz
