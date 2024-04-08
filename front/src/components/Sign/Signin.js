import React, {useState,useEffect} from 'react'
import './signin.css'
import {useGlobalContext} from '../../utilities/Context'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
const Signin = () => {
    const navigate = useNavigate()
    const {userInfo,updateInfo,showAlert}=useGlobalContext();
    const [user,setUser]=useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({
            ...user,
            [name]:value
        })
    }
    const handleClick = (e) => {
        e.preventDefault();
        if(user.email&&user.password){
            axios.post('https://pro-quiz-ser.vercel.app/user/login',{
                email: user.email,
                password: user.password
            }).then(({data})=>{
                const {token,type,msg}=data
                console.log(type,msg)
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
            }else{
showAlert({
    msg: 'please fill the requirements...',
    type: 'danger'
})
        }
    }
    useEffect(() => {
        const lToken = localStorage.getItem('localToken')
        axios.get(`https://pro-quiz-ser.vercel.app/user/auth?token=${lToken}`).then(({ data }) => {
          if (data.type === 'success') {
       navigate('/')
          }
        }).catch(err => console.log(err))
      }, [userInfo.name])
    return (
        <div className='form-con shadow rounded'>
            <h2 className='mb-4 text-primary fs-1 text-center'>Sign In</h2>
            <div className="form-floating mb-3">
                <input 
                value={user.email}
                onChange={handleChange}
                type="email" name='email' className="form-control" id="email" placeholder="name@example.com" />
                <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating mb-3">
                <input
                value={user.password}
                onChange={handleChange}
                type="password" className="form-control" id="password" name='password' placeholder="Password" />
                <label htmlFor="password">Password</label>
            </div>
            <div id="passwordHelpBlock" className="form-text mb-1">
                Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
            </div>
            <small className='ms-1'>Not a member? <Link to='/register' className='text-primary' style={{textDecoration: 'none'}}>Register</Link></small>
            <div className='d-flex'>
                <button 
                onClick={handleClick}
                type="button" className="sign-btn mt-3 rounded shaodw-sm">Log In</button>
            </div>

        </div>
    )

}

export default Signin
