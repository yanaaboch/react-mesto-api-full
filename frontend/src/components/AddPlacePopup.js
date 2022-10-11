import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

    React.useEffect(() => {
        resetForm();
      }, [resetForm, isOpen]);

    const handleSubmit = (event) => {
        event.preventDefault();

        onAddPlace({
            name: values.title,
            link: values.subtitle
        });
    };

    return (
        <PopupWithForm
                name="add"
                title="Новое место"
                buttonText="Создать"
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={handleSubmit}
                isDisabled={!isValid}
            >
                  
                          <input className="popup__input popup__input_type_cardname" id="cardname-input" placeholder="Название места" name="title" type="text" minLength="2" maxLength="30"  onChange={handleChange} value={values.title ? values.title : ''} required />
                          <span className="popup__input-error" id="cardname-input-error">{errors.title}</span>
                          <input className="popup__input popup__input_type_cardlink" id="link-input" placeholder="Ссылка на изображение" name="subtitle" type="url" onChange={handleChange} value={values.subtitle ? values.subtitle : ''} required />
                          <span className="popup__input-error" id="link-input-error">{errors.subtitle}</span>
                          
            
        </PopupWithForm>
    )
};

export default AddPlacePopup;