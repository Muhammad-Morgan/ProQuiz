const User = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

const authUser = (req, res) => {
    const { token } = req.query;
    if (!token) return res.json({
        type: 'failed',
        msg: 'no token'
    })
    jwt.verify(token, 'SECRET%msg%', (err, decode) => {
        if (err) {
            res.json({
                type: 'failed',
                msg: 'wrong token'
            })
        } else {
            res.json({
                myToken: token,
                type: 'success',
                msg: ''
            })
        }
    })
}

const regUser = (req, res) => {
    const { myID, name, email, password, type } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            User.create({
                myID,
                name,
                email,
                password: hash,
                type
            }).then(() => {
                const token = jwt.sign({ myID, name, type }, 'SECRET%msg%', { expiresIn: '1h' });
                res.json({
                    token,
                    type: 'success',
                    msg: 'registered !'
                })
            }).catch(err => console.log(err))
        })
    })
}

const logIn = (req,res)=>{
    const {email,password}=req.body;
    User.findOne({email}).then((found)=>{
        if(!found) return res.json({
            type: 'danger',
            msg: 'no account was found'
        })
        bcrypt.compare(password,found.password).then((result)=>{
            if(!result) return res.json({
                type: 'danger',
                msg: 'wrong password !'
            })
            const token = jwt.sign({myID: found.myID,name:found.name,type: found.type},'SECRET%msg%',{expiresIn: '1h'})
            res.json({
                token,
                type: 'success',
                msg: 'logged successfully !'
            })
        })
    }).catch(err=>console.log(err))
}

const getUser = (req,res)=> {
    const {myID}=req.query;
    User.findOne({myID}).then((result)=>res.json({
        user: result
    })).catch(err=>console.log(err))
}

const updateUser = (req,res) => {
    const {myID} = req.query;
    const {
        name,
        email,
        location,
        type
    } = req.body
    User.findOneAndUpdate({myID},
        {
            name,
            email,
            location,
            type
        }
        ).then(()=>{
        User.findOne({myID}).then((result)=>res.json({user: result}))
        }).catch(err=>console.log(err))
}

module.exports = {
    authUser,
    regUser,
    logIn,
    getUser,
    updateUser
}