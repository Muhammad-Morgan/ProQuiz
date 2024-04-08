import { useEffect } from 'react'
import { useGlobalContext } from '../../utilities/Context'
import { authorize } from '../../utilities/authorize'
import { useNavigate } from 'react-router-dom'
import QuizComp from '../../components/QuizComp/QuizComp'
const Question = () => {
  const navigate = useNavigate();
  const {
    userInfo,
    updateInfo,
    showAlert,
  } = useGlobalContext();
  useEffect(() => {
    authorize({ updateInfo, showAlert, navigate })
  }, [userInfo.name]);
  return <QuizComp />
}

export default Question
