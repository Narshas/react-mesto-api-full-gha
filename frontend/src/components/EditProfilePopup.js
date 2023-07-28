import React from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


export function EditProfilePopup({isLoading, isOpen, onClose, onUpdateUser, onOverlayClick}) {
    const [userName, setUserName] = React.useState('');
    const [userAbout, setUserAbout] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setUserName(currentUser.name);
        setUserAbout(currentUser.about);
      }, [currentUser]); 

    function handleNameChange(e) {
        setUserName(e.target.value);
    }

    function handleAboutChange(e) {
        setUserAbout(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: userName,
            about: userAbout
        });
    }

    return (
        <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isOpen} submitText={isLoading ? 'Сохранение...' : 'Сохранить'} onClose={onClose} onSubmit={handleSubmit} onOverlayClick={onOverlayClick}>
                <label className="popup__label"></label>
                <input value={userName || ""} onChange={handleNameChange} name="profilename" id="username-input" type="text" minLength="2" maxLength="40"
                    className="popup__input popup__input_profilename" required />
                <span className="popup__input-error popup__input-error_username-input" id="username-input-error">В этом поле
                    ошибка</span>

                <label className="popup__label"></label>
                <input value={userAbout || ""} onChange={handleAboutChange} name="profileabout" id="about-input" type="text" minLength="2" maxLength="200"
                    className="popup__input popup__input_profileabout" required />
                <span className="popup__input-error popup__input-error_about-input" id="about-input-error">В этом поле
                    ошибка</span>
            </PopupWithForm>
    )
}