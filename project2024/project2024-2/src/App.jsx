import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Main from './Components/Main/Main'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import Home from './Components/Home/Home'
import Info from './Components/Info/Info'
import Albums from './Components/Albums/Albums'
import Posts from './Components/Posts/Posts'
import Todos from './Components/Todos/Todos'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/users/:id' element={<Home />}>
            <Route path='Info' element={<Info />} />
            <Route path='Albums' element={<Albums />} />
            <Route path='Posts' element={<Posts />} />
            <Route path='Todos' element={<Todos />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
