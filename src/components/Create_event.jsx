import React from 'react';
import { useNavigate } from 'react-router-dom';

const Create_event = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/createtournir');
  };

  return (
    <div className='create_event'>
      <button className='create' onClick={handleCreateClick}>Создать турнир</button>
      <button className='join'><a>Найти турнир</a></button>
    </div>
  );
};

export default Create_event;
