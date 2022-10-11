import React from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({card, onCardClick, onCardLike, onCardDelete}) => {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;

    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    const cardLikeButtonClassName = `element__like-button ${
        isLiked ? "element__like-button_active" : ""
    }`;

    const cardDeleteButtonClassName = `element__delete-button ${
        isOwn ? '' : 'element__delete-button_hidden'
      }`;

    const handleClick = () => {
        onCardClick(card);
    };

    const handleLikeClick = () => {
            onCardLike(card);
    };
        
    const handleDeleteClick = () => {
            onCardDelete(card._id);
    };

    return (
        <article className="element" key={card._id}>
                <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
                <button type="button" aria-label="Удалить" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
                <div className="element__info">
                <h2 className="element__title">{card.name}</h2>
                    <div className="likes">
                        <button className={cardLikeButtonClassName}
            onClick={handleLikeClick} type="button" aria-label="Лайк"></button>
                        <div className="element__count_like">{card.likes.length}</div>
                    </div>
        </div>
    </article>
    )
}

export default Card;