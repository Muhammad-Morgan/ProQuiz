const express = require('express')
const router = express.Router()

const {submitQuiz,createName,getQuiz,getQuizes,updateName,getAllQuizes,searchTag,searchName,submitMyQuiz}=require('../controllers/quiz')

router.post('/createname',createName)
router.get('/getquiz',getQuiz)
router.put('/submitquiz',submitQuiz)
router.get('/getquizes',getQuizes)
router.get('/getallquizes',getAllQuizes)
router.post('/updatename',updateName)
router.get('/searchtag',searchTag)
router.get('/searchname',searchName)
router.put('/submitmyquiz',submitMyQuiz)

module.exports = router