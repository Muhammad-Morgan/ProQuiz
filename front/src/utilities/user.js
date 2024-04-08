import axios from'axios'
export const getUser = (myID,setProfile) => {
    axios.get(`https://pro-quiz-ser.vercel.app/user/getuser?myID=${myID}`).then(({data})=>{
        const {user} = data; 
        setProfile(user)
    }).catch(err=>console.log(err))
}