import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          subtitle: avatarRef.current.value,
        });
    } 

    return (
        <PopupWithForm
        name="avatar-edit"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        >
                <input className="popup__input popup__input_type_cardlink" id="avatar-input" placeholder="Ссылка на изображение" name="subtitle" type="url" ref={avatarRef} required />
                <span className="popup__input-error" id="avatar-input-error"></span>
        </PopupWithForm>
    )
};

export default EditAvatarPopup;