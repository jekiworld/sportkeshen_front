import styles from './Login.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ({ switch_authenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User logged successfully:', data);
        switch_authenticated(data.token);
        navigate('/');
      } else {
        console.error('Invalid email or password', data.error);
      }
    } catch (error) {
      console.error('Error during authentication', error);
    }
  }

  return (
    <div className='loginpage'>
      <div className="logpas">
        <h1 className='welcome'>Добро пожаловать</h1>
        <input onChange={handleEmail} className="login" placeholder='Логин' />
        <input onChange={handlePassword} className="password" placeholder='Пароль' />
        <button onClick={handleLogin} className='submit_log'>Войти</button>
      </div>
    </div>
  );
};

export default Login;
