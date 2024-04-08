import axios from 'axios'
export const getResult = (_id,startLoading,endLoading,setResult) => {
    startLoading()
    axios.get(`https://pro-quiz-ser.vercel.app/result/getresult?_id=${_id}`).then(({data})=>{
    const {result}=data
    setResult(result);
    endLoading()
    }).catch(err => console.log(err))
}