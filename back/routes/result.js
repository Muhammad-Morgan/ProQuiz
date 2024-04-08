const express = require('express')
const router = express.Router();
const Result = require('../model/result')
router.get('/getresult',(req,res)=>{
    const {_id} = req.query;
    Result.findById(_id).then((result)=> {
        res.json({
            result
        })
    }).catch(err => console.log(err))
})

module.exports = router