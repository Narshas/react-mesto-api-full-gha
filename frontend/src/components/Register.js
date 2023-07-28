import React from "react";
import {useNavigate, Link} from 'react-router-dom';

export function Register (props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleRegister(password, email);
        // setPassword('');
        // setEmail('');
    }

    return (
        <div className="authorize">
            <div className="authorize__container">
                <h1 className="authorize__title">Регистрация</h1>
                <form className="authorize__form" onSubmit={handleSubmit}>
                    
                    <input className="authorize__input" onChange={handleEmailChange}
                    id="email" type="email" name="email" required value={email || ''}
                    placeholder="Email"/>

                    <input className="authorize__input" onChange={handlePasswordChange}
                    id="password" type="password" name="password" required 
                    value={password || ''} placeholder="Пароль"/>
                    
                    <button className="authorize__submit" type="submit" 
                    aria-label="Зарегистрироваться" disabled={props.isNotAvailable}>
                        Зарегистрироваться
                    </button>
                </form>
        
                <div className="authorize__side-block">
                    <p className="authorize__side-text">Уже зарегистрированы?
                        <Link className="authorize__side-link" to="/sign-in"> Войти</Link>
                    </p>                        
                </div>
            </div>
        </div>
    )
}