import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../utilities/Context'
import { authorize } from '../../utilities/authorize'
import { getQuizes, searchTag } from '../../utilities/quizes'
import { Link, useNavigate } from 'react-router-dom'
import './myquizes.css'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Loading from '../../components/Loading'
const Myquizes = () => {
  const navigate = useNavigate();
  const { userInfo, updateInfo, showAlert, loading, startLoading, endLoading } = useGlobalContext();
  const [localSearchName, setLocalSearchName] = useState('')
  const [quizes, setQuizes] = useState([])
  useEffect(() => {
    authorize({ updateInfo, showAlert, navigate })
  }, [userInfo.name]);
  useEffect(() => {
    getQuizes(userInfo.myID, setQuizes,startLoading,endLoading)
  }, [userInfo.name])
  if (loading) {
    return <Loading />
  }
  else {
    return <div
      className='quizes-page d-flex'>
      <section
        style={{
          maxWidth: '1200px',
          marginInline: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%'
        }}

      >
        <aside
          style={{ top: '6rem' }}
          className='sticky-left my-filters rounded shadow me-auto'>
          <article className='px-2 mb-3'>
            <p className="form-label text-primary fs-5 mb-2 ms-1">Search </p>
            <input type="text"
              class="form-control"
              name='name'
              id="name"
              value={localSearchName}
              onChange={(e) => {
                setLocalSearchName(e.target.value)
                axios.get(`https://pro-quiz-ser.vercel.app/quiz/searchname?searchLetter=${e.target.value}`).then(({ data }) => {
                  const { quizes } = data
                  setQuizes(quizes)
                }).then(err => console.log(err))
              }}
              placeholder="quiz name" />
          </article>
          <div className='mt-3'>
            <p className='mb-0 fs-5 text-secondary ms-2'>Quiz type</p>
          </div>
          <hr
            style={{
              width: '90%',
              marginInline: 'auto'
            }}
          />
          <section className='buttons mb-3'>
            <button
              onClick={() => searchTag('math', setQuizes)}
              className="my-group-item">Math</button>
            <button
              onClick={() => searchTag('physics', setQuizes)}
              className="my-group-item">Physics</button>
            <button
              onClick={() => searchTag('biology', setQuizes)}
              className="my-group-item">Biology</button>
            <button
              onClick={() => searchTag('english', setQuizes)}
              className="my-group-item">English</button>
            <button
              onClick={() => searchTag('programming', setQuizes)}
              className="my-group-item">Programming</button>
          </section>

          <div class="d-flex
        justify-content-center">


            <button
              onClick={() => {
                getQuizes(userInfo.myID,setQuizes,startLoading,endLoading)
                setLocalSearchName('')
              }}
              type="button" class="clr-btn mb-3 shadow-sm rounded">Clear</button>
          </div>

        </aside>
        {quizes.length === 0 ? (

          <div class="d-flex flex-column me-auto justify-content-center">
            <h1
              style={{
                fontSize: '4rem'
              }}
              className='text-center'>Create your first <span className='text-primary-emphasis'>Quiz</span></h1>
            <article class="d-flex justify-content-center align-items-end pt-5">
              <Link
                to='/quiz'
                className='my-save px-5 fs-2 rounded shadow-sm'>GO
                <FontAwesomeIcon className='ms-2' icon={faArrowRightLong} />
              </Link>
            </article>
          </div>

        ) : (
          <div
            style={{ height: '100%' }}
            class="container d-flex align-items-center">
            <div
              style={{ height: '100%', width: '100%' }}
              className="ps-5 row row-cols-1 g-3 row-cols-md-2">
              {quizes.map((item) => {
                const { _id, name, author, questionsAmount } = item;
                return <div key={_id} className="col">
                  <div className="card py-3">
                    <article
                      style={{
                        width: '80%',
                      }}
                      className='card-body'>
                      <p className='mb-3 text-capitalize text-semibold text-primary-emphasis fs-4'>{name}</p>
                      <hr className='mb-4' />
                      <div className='d-flex justify-content-between mb-3'>
                        <p className='mb-0 fs-5'>Created by :</p>
                        <p className='mb-0 fs-5 text-capitalize'>{author}</p>
                      </div>
                      <div className='d-flex justify-content-between mb-4'>
                        <p className='mb-0 fs-5'>Number of Questions :</p>
                        <p className='mb-0 fs-5 text-capitalize'>{questionsAmount}</p>
                      </div>
                      <div class="d-flex"><Link
                        to={`/myquizes/editquiz/${_id}`}
                        className='my-save ms-auto rounded shadow-sm'>Edit</Link></div>
                    </article>
                  </div>
                </div>
              })}
            </div>
          </div>
        )}
      </section>
    </div>

  }

}

export default Myquizes
