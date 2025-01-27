import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ authenticated, token, switch_authenticated_false }) => {

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleMainClick = () => {
    navigate('/');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLogoutClick = async () => {
    try {
      const response = await fetch('http://localhost:8080/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        switch_authenticated_false();
        navigate('/');
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <div className="header">
      <ul className='header-ul'>
        <li className='one'><Link to="/" onClick={handleMainClick}>sportkeshen</Link></li>
        <li className='two'><a>Турниры</a></li>
        <li className='three'><a>О нас</a></li>
        <li className='four'><a>Сообщество</a></li>
        {authenticated ? (
          <>
            <li className='five'><button onClick={handleLogoutClick}>Выйти</button></li>
          </>
        ) : (
          <>
            <li className='five'><Link to="login" onClick={handleLoginClick}>Войти</Link></li>
            <li className='six'><Link to="register" onClick={handleRegisterClick}>Зарегистрироваться</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
