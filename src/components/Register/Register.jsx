import styles from './Register.css'
import React, { useState } from 'react'

const Register = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfrimPassword] = useState('');

    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);
    const handleUserNameChange = (e) => setUserName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfrimPassword(e.target.value);

    const handleRegistration = () => {
        const userData = {
            first_name,
            last_name,
            username,
            email,
            password,
            confirm_password,
        };
        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Registration successful:', data);
            })
            .catch((error) => {
                console.error('Error during registration:', error);
            });
    }

    

    return (
        <div className='regpage'>
            <div className="registerpage">
                <div className="fullname">

                    <div className="firstname_box">
                        <a>Имя</a>
                        <input onChange={handleFirstNameChange} type="text" className="firstname" />
                    </div>

                    <div className="secondname_box">
                        <a>Фамилия</a>
                        <input onChange={handleLastNameChange} type="text" className="secondname" />
                    </div>

                </div>

                <div className="emailpage">

                    <div className="username">
                        <a>Имя пользователья</a>
                        <input onChange={handleUserNameChange} type="text" className="username_in" />
                    </div>

                    <div className="email">
                        <a>Почта</a>
                        <input onChange={handleEmailChange} type="text" className="email_in" />
                    </div>

                    <div className="regpassword">
                        <a>Пароль</a>
                        <input onChange={handlePasswordChange} type="text" className="regpas_in" />
                    </div>


                    <div className="confrimpassword">
                        <a>Повторите пароль</a>
                        <input onChange={handleConfirmPasswordChange} type="text" className="confirmpas_in" />
                    </div>
                </div>

                <button onClick={handleRegistration} className='regbut'> Зарегестрироваться</button>
            </div>
        </div>
    );
};

export default Register;