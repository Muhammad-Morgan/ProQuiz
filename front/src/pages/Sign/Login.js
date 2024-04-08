import React from 'react'
import './sign.css'
import Signin from '../../components/Sign/Signin'
const Login = () => {
  return (
    <article className='my-bg'>
        <div className='row row-cols-1 row-cols-lg-2 align-items-center max-w'>
            <section className='row d-none d-lg-block'>
                <div>
                    <h1 style={{fontSize: '2rem',textWrap: 'nowrap'}} className='m-4 fw-bold'>Start your journey here...</h1>
                    <p className='m-4 fs-5 text-secondary'>Check your own knowledge by picking an existing quiz and see your results !</p>
                    <p className='m-4 fs-5 text-secondary'>Create your own quiz and invite your friends or students to take it</p>
                </div>
            </section>
            <section className='row ms-auto'>
            <Signin />
            </section>
        </div>
    </article>
  )
}

export default Login
