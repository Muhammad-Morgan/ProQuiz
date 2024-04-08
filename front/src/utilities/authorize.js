import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
export const authorize = ({updateInfo,navigate,showAlert}) => {

    const lToken = localStorage.getItem('localToken')
    axios.get(`http://localhost:5000/user/auth?token=${lToken}`).then(({ data }) => {
        const { myToken } = data;
        if (data.type === 'success') {
            const myData = jwtDecode(myToken);
            const { name, type, myID } = myData;
            updateInfo({
                name,
                type,
                myID
            })
        } else {
            navigate('/login')
            showAlert({
                msg: 'session expired',
                type: 'danger'
            })
        }
    }).catch(err => console.log(err))

}