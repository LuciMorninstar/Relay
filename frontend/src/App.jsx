import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import ChatPage from './pages/ChatPage'


const App = () => {
  return (

    <Router>

      <Routes>

        <Route path = "/" element = {<HeroSection/>}/>
        <Route path = "/signUp" element = {<SignUp/>}/>
        <Route path = "/signIn" element = {<SignIn/>}/>
        <Route path = "/chat" element = {<ChatPage/>}/>

      </Routes>
    </Router>

  )
}

export default App