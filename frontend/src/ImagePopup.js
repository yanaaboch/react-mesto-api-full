import React from "react";

function ImagePopup() {
    return (
        <div className="popup popup_openimage popup_photo">
            <div className="popup__show-image">
                <button className="popup__close" id="closeImage" type="button" aria-label="Закрыть изображение"></button>
                <figure className="popup__content">
                    <img className="popup__image" src="#" alt="Загруженное изборажение" />
                    <figcaption className="popup__image-caption"></figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;