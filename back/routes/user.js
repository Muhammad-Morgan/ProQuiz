const express = require('express')
const router = express.Router()

// Req
const {
    authUser,
    regUser,
    logIn,
    getUser,
    updateUser
} = require('../controllers/user')

router.get('/auth', authUser)
router.post('/register', regUser)
router.post('/login',logIn)
router.get('/getuser',getUser)
router.put('/updateuser',updateUser)

module.exports = router