import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useRef, useEffect } from 'react'
import { useGlobalContext } from '../../utilities/Context'
import { Link, useNavigate } from 'react-router-dom'
import './nav.css'
const Nav = () => {
    const navigate = useNavigate()
    const [navConditions, setNavConditions] = useState({
        toggle: false,
        dropDown: false
    })
    const { userInfo, showAlert, updateInfo } = useGlobalContext();
    return (
        <nav className="navbar sticky-top shadow navbar-expand-lg">
            <div className="container-lg">
                <Link
                    style={{ textDecoration: 'none' }}
                    className="navbar-brand" to='/'>Quiz Maker</Link>
                <button
                    onClick={() => setNavConditions({
                        ...navConditions,
                        toggle: !navConditions.toggle
                    })}
                    className="navbar-toggler" type="button">
                    <FontAwesomeIcon className='fa-xl' color='#fff' icon={faBars} />
                </button>
                <div className={`${navConditions.toggle ? 'show' : ''} collapse navbar-collapse`} id="navbarSupportedContent">
                    <ul className="navbar-nav gap-3 ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                style={{ textDecoration: 'none' }}
                                className="nav-link">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                style={{ textDecoration: 'none' }}
                                className="nav-link">Contact</Link>
                        </li>
                        {userInfo.name &&
                            <li className="nav-item dropdown">
                                <Link
                                    style={{ textDecoration: 'none' }}

                                    onClick={() => setNavConditions({
                                        ...navConditions,
                                        dropDown: !navConditions.dropDown
                                    })}
                                    className="nav-link dropdown-toggle text-capitalize"
                                    role='button'
                                >
                                    {userInfo.name}
                                </Link>
                                <ul className={`dropdown-menu ${navConditions.dropDown ? 'show' : ''}`}>
                                    <li><Link className="dropdown-item" to='/allquizes'>All Quizes</Link></li>
                                    {userInfo.type === 'instructor' && <li><Link className="dropdown-item" to='/myquizes'>My Quizes</Link></li>
                                    }
                                    {userInfo.type === 'instructor' && <li><Link className="dropdown-item" to='/quiz'>Create Quiz</Link></li>
                                    }
                                    <li><Link className="dropdown-item" to='/profile'>Profile</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li className='d-flex'>
                                        <button
                                            onClick={() => {
                                                localStorage.removeItem('localToken');
                                                showAlert({
                                                    msg: 'logged out !',
                                                    type: 'success'
                                                })
                                                updateInfo({
                                                    name: '',
                                                    myID: '',
                                                    type: ''
                                                })
                                                setNavConditions(navConditions.dropDown = false)
                                                navigate('/')
                                            }}
                                            style={{ textDecoration: 'none' }} className="logout-nav" >Log Out</button>
                                    </li>
                                </ul>
                            </li>
                        }
                    </ul>
                    <section className="d-flex ms-lg-3">
                        {userInfo.name ?
                            ''
                            :
                            <Link style={{ textDecoration: 'none', letterSpacing: '1px' }} to='/login
                            ' className="my-search-nav shadow rounded" >Join</Link>
                        }
                    </section>
                </div>
            </div>
        </nav>
    )
}

export default Nav
