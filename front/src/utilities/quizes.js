import axios from 'axios'
export const getQuizes = (myID,setQuizes,startLoading,endLoading) => {
    startLoading()
    axios.get(`https://pro-quiz-ser.vercel.app/quiz/getquizes?myID=${myID}`).then(({ data }) => {
        const { quizes } = data;
         setQuizes(quizes)
         endLoading()
    }).catch(err => console.log(err))
}
export const getAllQuizes = (setQuizes,startLoading,endLoading) => {
    startLoading()
    axios.get(`https://pro-quiz-ser.vercel.app/quiz/getallquizes`).then(({ data }) => {
        const { quizes } = data;
         setQuizes(quizes)
         endLoading()
    }).catch(err => console.log(err))
}
export  const searchTag = (quizType,setQuizes) =>{
    axios.get(`https://pro-quiz-ser.vercel.app/quiz/searchtag?quizType=${quizType}`).then(({data})=>{
        const {quizes} = data
        setQuizes(quizes)
    }).then(err=>console.log(err))
}

export const getQuiz = (_id,setMyQuiz,setQuestionQuantity)=>{
    axios.get(`https://pro-quiz-ser.vercel.app/quiz/getquiz?_id=${_id}`).then(({data})=>{
        const {quiz,questionsAmount} = data;
        setMyQuiz(quiz);
        setQuestionQuantity(questionsAmount)
    }).catch(err=>console.log(err))
}
