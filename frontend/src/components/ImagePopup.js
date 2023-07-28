import React from "react";

export function ImagePopup({ cardData, onClose, isOpen, onOverlayClick }) {
    return (
        <div className={`popup popup_type_zoom ${isOpen ? "popup_active" : ""}`} onClick={onOverlayClick}>
            <div className="popup__zoom-container">
                <button className="popup__close popup__close_zoom" onClick={onClose}></button>
                <img src={cardData.link} alt={cardData.name} className="popup__image" />
                <p className="popup__caption">{cardData.name}</p>
            </div>
        </div>
    )
}