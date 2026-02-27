import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import ChatPage from './pages/ChatPage'
import  { Toaster } from 'react-hot-toast';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'




const queryClient = new QueryClient();  // THis is global instance of query client which will be used in the entire app. We can use this instance to access the cache and other functionalities of react query in any component of the app by using the useQueryClient hook.
const App = () => {
  return (

    <QueryClientProvider client ={queryClient}>

    <Router>

      <Routes>

        <Route path = "/" element = {<HeroSection/>}/>
        <Route path = "/signUp" element = {<SignUp/>}/>
        <Route path = "/signIn" element = {<SignIn/>}/>
        <Route path = "/chat" element = {<ChatPage/>}/>

      </Routes>
      <Toaster position='top-right'/>
    </Router>
    
    <ReactQueryDevtools initialIsOpen={false}/>

    </QueryClientProvider>

  )
}

export default App