import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  React.useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [ resetForm, currentUser, isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdateUser({
        title: values.name,
        subtitle: values.about,
    });
  };

  return (
    <PopupWithForm
                  name="edit"
                  title="Редактировать профиль"
                  buttonText="Сохранить"
                  isOpen={isOpen}
                  onClose={onClose}
                  onSubmit={handleSubmit}
                  isDisabled={!isValid}
                  >
                    <input className="popup__input popup__input_type_name" id="name-input" placeholder="Введите имя" name="name" type="text" minLength="2" maxLength="40" required value={values.name || ''}
          onChange={handleChange} />
                    <span className="popup__input-error" id="name-input-error">{errors.name}</span>
                    <input className="popup__input popup__input_type_description" id="description-input" placeholder="Введите информацию о себе" name="about" type="text" minLength="2" maxLength="200" required  value={values.about || ''}
          onChange={handleChange} />
                    <span className="popup__input-error" id="description-input-error">{errors.about}</span>
           
                  
              </PopupWithForm>
  );
};

export default EditProfilePopup;