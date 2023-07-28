import React from "react";
import errorLogo from '../images/error-logo.png'; 
import okLogo from '../images/ok-logo.png';

export function InfoTooltip (props) {

    return (
        <div className={`popup ${props.isOpen? 'popup_active' : ''}`}
            onClick={props.onOverlayClick}>

            <div className="popup__container">
                
                <img src={!props.isError? okLogo : errorLogo }
                    className="authorize__image"/>

                <h2 className="authorize__info">
                    {`${!props.isError
                    ? "Вы успешно зарегистрировались!"
                    : "Что-то пошло не так! Попробуйте ещё раз."}`}
                </h2>
                
                <button className="popup__close" aria-label="закрыть попап" onClick={props.onOverlayClick}/>
                
            </div>
        </div>
    )
}