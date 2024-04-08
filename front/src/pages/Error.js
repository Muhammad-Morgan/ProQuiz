import React from 'react'
import {Link} from 'react-router-dom'
const Error = () => {
  return (
    <div>
      <h1 className='text-center fw-normal mb-5'>Oops...</h1>
      <div classNamed='d-flex justify-content-center'>
      <Link className='my-save rounded shadow-sm' to='/'>Get Back</Link>
      </div>
    </div>
  )
}

export default Error
