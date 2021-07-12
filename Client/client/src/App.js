import React from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Mypost from './pages/Mypost'
import Index from './pages/Index'
import './css/App.css'


const App = () => {
  
  let path = window.location.pathname // tidak boleh diluar method App

  switch (path) {
    case '/login':
      return <Login />
    case '/signup':
      return <Signup />
    case '/home':
      return <Home />
    case '/home/mypost':
      return <Mypost />
    default:
      return <Index />
  }
}

export default App;
