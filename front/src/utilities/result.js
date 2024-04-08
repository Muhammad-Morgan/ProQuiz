import axios from 'axios'
export const getResult = (_id,startLoading,endLoading,setResult) => {
    startLoading()
    axios.get(`http://localhost:5000/result/getresult?_id=${_id}`).then(({data})=>{
    const {result}=data
    setResult(result);
    endLoading()
    }).catch(err => console.log(err))
}