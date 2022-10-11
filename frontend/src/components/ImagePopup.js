import React from "react";

const ImagePopup = ({ card, onClose }) => {
    return (
        <div className={`popup popup_openimage popup_photo ${card.link ? "popup_opened" : ""}`}>
            <div className="popup__show-image">
                <button className="popup__close" onClick={onClose} id="closeImage" type="button" aria-label="Закрыть изображение"></button>
                <figure className="popup__content">
                    <img className="popup__image" src={card.link} alt={card.name} />
                    <figcaption className="popup__image-caption">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    );
};

export default ImagePopup;