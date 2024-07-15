import styles from './App.css'

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Create_event from './components/Create_event';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Create_tournir from './components/Create_tournir/Create_tournir';
import ViewTournaments from './components/FindTournaments/FindTournaments';
import Dashboard from './components/Dashboard/Dashboard';
import { useState } from 'react';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState('');

  const switch_authenticated = (token) => {
    setAuthenticated(true);
    setUserToken(token);
  };

  const switch_authenticated_false = () => {
    setAuthenticated(false);
  };

  return (
    <Router>
      <div className="all">
        <Header authenticated={authenticated}
          token={userToken}
          switch_authenticated_false={switch_authenticated_false}
        />
      </div>
      <Routes>
        <Route path='/' element={<Create_event />} />
        <Route path='/login' element={<Login switch_authenticated={switch_authenticated} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/createtournir' element={<Create_tournir token={userToken} />} />
        <Route path='/viewtournaments' element={<ViewTournaments token={userToken} />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
