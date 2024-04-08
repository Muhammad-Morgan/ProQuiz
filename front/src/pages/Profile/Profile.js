import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../utilities/Context'
import { authorize } from '../../utilities/authorize'
import { getUser } from '../../utilities/user'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './profile.css'
import Loading from '../../components/Loading'
const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, updateInfo, showAlert, loading,startLoading,endLoading } = useGlobalContext();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    location: '',
    type: ''
  })
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProfile({
      ...profile,
      [name]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    startLoading()
    axios.put(`https://pro-quiz-ser.vercel.app/user/updateuser?myID=${userInfo.myID}`,{
      name: profile.name?.toLowerCase(),
      email: profile.email,
      location: profile.location,
    }).then(({data})=>{
      const {user} = data
      console.log(user)
      setProfile({
        ...profile,
        name: user?.name,
        email: user?.email,
        location: user?.location,
        type: user?.type,
      })
      updateInfo({
        name: user?.name,
        myID: userInfo.myID,
        type: user?.type
      })
      endLoading()
    }).catch(err=>console.log(err))
  }
  useEffect(() => {
    authorize({ updateInfo, showAlert, navigate })
  }, [userInfo.name]);
  useEffect(() => {
    getUser(userInfo.myID, setProfile)
  }, [userInfo.name])
  if (loading) return <Loading />
  return (
    <div className='profile-page'>
      <article className='profile-center rounded shadow'>
        <h2 style={{ maxWidth: '90%', marginInline: 'auto' }} className='text-capitalize fw-light text-primary-emphasis mb-4'>Hello {profile?.name} !</h2>
        <hr style={{ width: '90%', marginBottom: '2rem', marginInline: 'auto' }} />
        <form
        onSubmit={handleSubmit}
          style={{ maxWidth: '90%', marginInline: 'auto' }}
          class="row g-3 mb-4">
          <div class="col-md-4">
            <label htmlFor="name" class="form-label">Name</label>
            <input
              type="text"
              name='name'
              class="form-control"
              id="name"
            value={profile?.name}
            onChange={handleChange}
            />
          </div>
          <div class="col-md-4">
            <label htmlFor="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
            value={profile?.email}
            onChange={handleChange}
            />
          </div>
          <div class="col-md-4">
            <label htmlFor="location" class="form-label">Location</label>
            <input
              type="text"
              name='location'
              class="form-control"
              id="location"
            value={profile?.location}
            onChange={handleChange}

            />
          </div>
          <div class="col-md-6">
            <label htmlFor="type" class="form-label">Type</label>
            <select
              name='type'
              id="type"
              class="form-select"
            value={profile?.type}
            onChange={handleChange}
            >
              <option></option>
              <option value='instructor'>Instructor</option>
              <option value='student'>Student</option>
            </select>
          </div>
          <div class="col-6 mt-auto d-flex">
            <button
            style={{width: '80%', marginInline: 'auto'}}
            type="submit" class="btn btn-primary">Update</button>
          </div>
        </form>
      </article>
    </div>
  )
}

export default Profile
