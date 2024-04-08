import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Alert from './components/Alert/Alert';
import Nav from './components/Nav/Nav';
import Home from './pages/Home/Home'
import Error from './pages/Error'
import Login from './pages/Sign/Login';
import Register from './pages/Sign/Register';
import Quiz from './pages/Quiz/Quiz';
import Allquizes from './pages/AllQuizes/Allquizes'
import Myquizes from './pages/Myquizes/Myquizes'
import Profile from './pages/Profile/Profile'
import Question from './pages/Q&A/Question';
import Edit from './pages/Edit/Edit';
import Editq from './pages/EditQuestion/Editq';
import Exam from './pages/Exam/Exam';
import Result from './pages/Result/Result';
function App() {
  return (
    <>
      <Router>
        <Nav />
        <Alert />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/question' element={<Question />} />
          <Route path='/allquizes' element={<Allquizes />} />
          <Route path='/allquizes/takequiz/:_id' element={<Exam />} />
          <Route path='/myquizes' element={<Myquizes />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/myquizes/editquiz/:_id' element={<Edit />} />
          <Route path='/result/:_id' element={<Result />} />
          <Route path='/myquizes/editquizquestion/:_id' element={<Editq />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
