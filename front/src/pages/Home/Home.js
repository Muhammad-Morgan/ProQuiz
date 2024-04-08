import React, { useEffect } from 'react'
import './home.css'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useGlobalContext } from '../../utilities/Context'
const Home = () => {
  const { userInfo, showAlert, updateInfo } = useGlobalContext();
  useEffect(() => {
    const lToken = localStorage.getItem('localToken')
    axios.get(`http://localhost:5000/user/auth?token=${lToken}`).then(({ data }) => {
      const { myToken } = data
      if (data.type === 'success') {
        const myData = jwtDecode(myToken)
        const { name, myID, type } = myData;
        updateInfo({
          name,
          myID,
          type
        })
      }
    }).catch(err => console.log(err))
  }, [userInfo.name])
  return (
    <div
      className="pt-4 px-0 container-fluid d-flex flex-column align-items-center">
      <article style={{
        marginBlock: '8rem'
      }} className='pb-5'>
        <h1 style={{ fontSize: '4rem', marginBottom: '2rem', marginTop: '2rem' }} className='text-center'>The remarkably fun quiz maker</h1>
        <h3 className='text-center fw-normal'>Make quizzes that more people take. Try for free.
        </h3>
      </article>
      <article
        style={{ backgroundColor: '#fff', width: '100%', paddingBlock: '6rem' }}
      >
        <div

          style={{
            maxWidth: '1250px',
            marginInline: 'auto'
          }}
          className="row row-cols-1 align-items-center g-5 row-cols-md-2">
          <div className="col">
            <div
              style={{
                border: 'none',
                backgroundColor: 'transparent'
              }}
              className="card">
              <div className="card-body">
                <h1 className="card-title mb-4">Make your quiz feel more personal</h1>
                <p className="card-text fs-5 mb-4">Finally, a quiz creator that lets you get personal. Call quiz takers by name and show different results—like specific product recommendations—based on their answers.</p>
                <a href="#" className="my-search-nav-1 rounded shadow">Start here</a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow">
              <img src='https://d1jsyr8icnst5o.cloudfront.net/uploads/listing/preview/13330/default_cover-quizgrowth.png' className='rounded' />
            </div>
          </div>
        </div>

      </article>
      <article
        style={{ width: '100%', paddingBlock: '6rem' }}
      >
        <div

          style={{
            maxWidth: '1250px',
            marginInline: 'auto'
          }}
          className="row row-cols-1 align-items-center g-5 row-cols-md-2">
          <div className="col">
            <div style={{ border: 'none' }} className="card">
              <img src='https://images.ctfassets.net/co0pvta7hzrh/3cEBwUOwR8GW2db7SWkR1b/baf64565279b0318063a26aa44ed901f/make_the_most_quiz.png?fm=webp&q=75' className='rounded' />
            </div>
          </div>

          <div className="col">
            <div
              style={{
                border: 'none',
                backgroundColor: 'transparent'
              }}
              className="card">
              <div className="card-body">
                <h1 className="card-title mb-4">Make the most of every quiz taker</h1>
                <p className="card-text fs-5 mb-4">After someone takes your quiz, direct them to where they can buy recommended products. Follow up with enticing discount codes by integrating with platforms like Mailchimp.</p>

              </div>
            </div>
          </div>
        </div>
      </article>
      <footer className='container-fluid p-3'>
        <section className="container d-flex justify-content-between">
          <section>
            <p className='mb-0 text-white'>© 2024 Quiz Maker. All Rights Reserved. Developed by iCloudit</p>
          </section>
          <ul class="m-list d-flex mb-0">
            <li class="mb-0 m-item text-nowrap">Cookies settings</li>
            <li class="mb-0 m-item">-</li>
            <li class="mb-0 m-item text-nowrap">Check out Cookie Policy to delete cookies</li>
            <li class="mb-0 m-item text-nowrap">Report abuse</li>
          </ul>
        </section>
      </footer>
    </div>
  )
}

export default Home
