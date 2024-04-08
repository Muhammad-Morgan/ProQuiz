import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useGlobalContext } from '../../utilities/Context'
import './alert.css'
const Alert = () => {
    const { hideAlert, alert } = useGlobalContext();
    const {
        msg,
        type,
        condition
    } = alert
        useEffect(() => {
            const getTime = setTimeout(() => {
                hideAlert()
            }, 3000);
            return () => clearTimeout(getTime)
        }, [condition]);
    return (
        <aside className={`my-alert             
        ${condition && 'show-alert'}
        ${type === 'success' && 'alert-success-border'}
        ${type === 'danger' && 'alert-danger-border'}
        `}>
            <article className='alert-content'>
                <p className={`m-0
                ${type === 'success' && 'alert-success-text'}
                ${type === 'danger' && 'alert-danger-text'}
                `}>
                    <FontAwesomeIcon className='me-2' icon={faCircleExclamation} />
                    {msg}
                </p>

                <button
                    onClick={hideAlert}
                    type="button" className={`alert-close-container
                    ${type === 'success' && 'alert-success-text'}
                    ${type === 'danger' && 'alert-danger-text'}
                    `}>
                    <FontAwesomeIcon className='alert-close-btn' icon={faXmark} />
                </button>

            </article>
        </aside>
    )
}

export default Alert