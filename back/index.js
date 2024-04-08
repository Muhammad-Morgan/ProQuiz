// Basic requirements
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Initiallizing instences
const app = express()

// My Requires
const user = require('./routes/user')
const quiz = require('./routes/quiz')
const result = require('./routes/result')

// Middle Ware
app.use(express.json())
app.use(cors())

// Connecting to DB
mongoose.connect('mongodb+srv://muhammad:helloworld123@jobster.r7jsbjp.mongodb.net/quiznew?retryWrites=true&w=majority')
mongoose.connection.once('open',()=> console.log('Connected to MongoDB'))

// Routes
app.use('/user',user)
app.use('/quiz',quiz)
app.use('/result',result)

// Root
app.get('/',(req,res)=>{
    res.send(`<h1>Hello there...</h1>`)
})

// Checking the server
app.listen(5000, ()=> console.log(`Listening to Port: 5000`))