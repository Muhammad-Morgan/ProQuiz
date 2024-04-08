import axios from'axios'
export const getUser = (myID,setProfile) => {
    axios.get(`http://localhost:5000/user/getuser?myID=${myID}`).then(({data})=>{
        const {user} = data; 
        setProfile(user)
    }).catch(err=>console.log(err))
}