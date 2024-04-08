import React, { useEffect } from 'react'
import { useGlobalContext } from '../../utilities/Context'
import { authorize } from '../../utilities/authorize'
import { useNavigate } from 'react-router-dom'
import QuizCompD from '../../components/QuizComp/QuizCompD'

const Editq = () => {
    const navigate = useNavigate();
    const {
        userInfo,
        updateInfo,
        showAlert,
    } = useGlobalContext();
    useEffect(() => {
        authorize({ updateInfo, showAlert, navigate })
    }, [userInfo.name]);
    return <QuizCompD />
}

export default Editq
