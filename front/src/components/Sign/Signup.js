import React, { useState,useEffect } from 'react'
import './signin.css'
import { Link,useNavigate } from 'react-router-dom'
import {useGlobalContext} from '../../utilities/Context'
import {jwtDecode} from 'jwt-decode'
import axios from 'axios'
const Signun = () => {
    const navigate = useNavigate()
    const {updateInfo,showAlert,userInfo}=useGlobalContext()
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        type: ''
    })
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            ...user,
            myID: new Date().getTime().toString()
        }
        if(user.name&&user.email&&user.password&&user.type){
            axios.post(`http://localhost:5000/user/register`,
            {
                name: newUser.name.toLowerCase(),
                email: newUser.email,
                password: newUser.password,
                type: newUser.type,
                myID: newUser.myID
            }
            ).then(({data})=>{
                const {token,type,msg}=data
                if(type === 'success'){
                    const myData = jwtDecode(token)
                    const {name,myID,type}=myData
                    localStorage.setItem('localToken',token)
                    updateInfo({
                        name,
                        type,
                        myID
                    })
                    showAlert({
                        msg: data.msg,
                        type: data.type
                    })
                    navigate('/')
                }else{
                    showAlert({
                        msg: data.msg,
                        type: data.type
                    })
                }

            }).catch(err=>console.log(err))
            }
            else{
                showAlert({
                    msg: 'please fill the requirements...',
                    type: 'danger'
                })
            }
    }
    useEffect(() => {
        const lToken = localStorage.getItem('localToken')
        axios.get(`http://localhost:5000/user/auth?token=${lToken}`).then(({ data }) => {
          if (data.type === 'success') {
       navigate('/')
          }
        }).catch(err => console.log(err))
      }, [userInfo.name])
    return (
        <div className='form-con-signup shadow rounded'>
            <h2 className='mb-4 text-primary fs-1 text-center'>Sign Up</h2>
            <div className="form-floating mb-3">
                <input
                onChange={handleChange}
                    type="text"
                    name='name'
                    className="form-control"
                    id="name"
                    placeholder="Muhammad" 
                    value={user.name}
                    />
                <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
                <input
                onChange={handleChange}
                    type="email"
                    name='email'
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={user.email}
                    />
                <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating mb-3">
                <input
                onChange={handleChange}
                    type="password"
                    name='password'
                    className="form-control"
                    id="password"
                    placeholder="Password" 
                    value={user.password}
                    />
                <label htmlFor="password">Password</label>
            </div>
            <div class="form-floating">
                <select 
                onChange={handleChange}
                class="form-select" 
                name='type'
                id="floatingSelect" 
                aria-label="Floating label select example"
                value={user.type}
                >
                    <option value=""></option>
                    <option value="instructor">Instructor</option>
                    <option value="student">Student</option>
                </select>
                <label for="floatingSelect">Instructor / Student</label>
            </div>
            <small className='ms-1'>Not a member? <Link to='/login' className='text-primary' style={{ textDecoration: 'none' }}>Login</Link></small>
            <div className='d-flex mt-2'>
                <button
                onClick={handleSubmit}
                type="button" className="sign-btn rounded shaodw-sm">Register</button>
            </div>

        </div>
    )
}

export default Signun
