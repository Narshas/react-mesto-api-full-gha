import React from "react";

export function PopupWithForm({ name, title, children, isOpen, submitText, onClose, onSubmit, onOverlayClick }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_active" : ""}`} onClick={onOverlayClick}>
            <div className="popup__container">
                <button type="button" className="popup__close popup__close_place" 
                aria-label="закрыть попап" onClick={onClose}></button>
                <h3 className="popup__title">{title}</h3>

                <form className={`popup__form popup__form_${name}`} name={name} onSubmit={onSubmit} noValidate>
                    {children}
                    <button type="submit" className="popup__submit" 
                    aria-label="Создать">{submitText}</button>
                </form>
            </div>
        </div>
    )
}