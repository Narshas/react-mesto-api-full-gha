import React from "react";
import { PopupWithForm } from "./PopupWithForm";

export function DeletePlacePopup (props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onConfirmDeleteCard();
    }

    return (
        <PopupWithForm
            name="delete" 
            title="Вы уверены?" 
            isOpen={props.isOpen} 
            submitText="Да"
            onClose={props.onClose} 
            onSubmit={handleSubmit}
            onOverlayClick={props.onOverlayClick}
        />
    )
}