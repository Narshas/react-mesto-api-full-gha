import React from 'react';
import logoWhite from "../images/logo-white.svg";
import {Route, Routes, Link} from 'react-router-dom';

export function Header(props) {
    return (
        <header className='header'>
            <div className='header__container'>
                <img src={logoWhite} alt="Логотип сервиса Место" className='header__logo' />
                <Routes>
                    <Route path='/' element={(
                        <div className='header__user-bar'>
                            <p className='header__user-item'>{`${props.email}`}</p>
                            <button className="header__logout" type="button" onClick={props.handleLogout}>Выйти</button>
                        </div>
                    )} />
                    <Route path='/signin' element={(<><Link className='header__user-item' to='/signup'>Регистрация</Link></>)}/>
                    <Route path='/signup' element={(<><Link className='header__user-item' to='/signin'>Войти</Link></>)}/>
                </Routes>
            </div>
        </header>
    )
}