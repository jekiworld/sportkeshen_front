import styles from './App.css'
import Header from './components/Header'
import Create_event from './components/Create_event'
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Create_tournir from './components/Create_tournir/Create_tournir';
import Dashboard from './components/Dashboard/Dashboard';
import { useState } from 'react';



export default function Home() {

  const [authenticated, setAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState('');

  const switch_authenticated = (token) => {
    setAuthenticated(true);
    setUserToken(token);
  }

  const switch_authenticated_false = () => {
    setAuthenticated(false);
  }

  console.log(authenticated)

  return (
    <Router>
      <div className="all">
        <Header authenticated={authenticated}
          token={userToken}
          switch_authenticated_false={switch_authenticated_false}
        />
        <Outlet />
      </div>
      <Routes>
        <Route path='/' element={<Create_event />} />
        <Route path='/login' element={<Login
          switch_authenticated={switch_authenticated}
        />} />
        <Route path='/register' element={<Register />} />
        <Route path='/createtournir' element={<Create_tournir />} />
        <Route path='/dashboard' element={<Dashboard />} />

      </Routes>
    </Router>

  )
} 
