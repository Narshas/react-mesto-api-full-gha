import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";


export function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const handleZoomClick = () => {
        onCardClick(card);
    }

    const handleCardLike = () => {
        onCardLike(card);
    }

    const handleDeleteClick = () => {
        onCardDelete(card);
    }

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(id => id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `elements__like-button ${isLiked && 'elements__like-button_active'}` 
    );

    console.log("urrentUser._id", currentUser._id);
    console.log("isLiked", isLiked);


    return (
        <li className="elements__item">
            {isOwn && <button type="button" className='elements__trash-button' 
            onClick={handleDeleteClick} aria-label="удалить карточку места" />}
            <img src={card.link} alt={card.name} className="elements__image" onClick={handleZoomClick} />
            <div className="elements__block">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__like-container">
                    <button type="button" className={cardLikeButtonClassName} aria-label="поставить лайк месту" onClick={handleCardLike}></button>
                    <p className="elements__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}