import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { FormValidator } from "./FormValidator";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, handleOpenForm, isFormValid, resetForm } = FormValidator();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [userName, setUserName] = useState("");
  const [userAbout, setUserAbout] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name: userName,
      about: userAbout
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  useEffect(() => {
    if (values.name) {
      setUserName(values.name);
    } else {
      setUserName(name);
    }

    if (values.about) {
      setUserAbout(values.about);
    } else {
      setUserAbout(about);
    }
  }, [values.name, values.about, name, about])

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      isClosed={props.isClosed}
      setClosed={props.setClosed}
      onClose={props.onClose}
      onCloseByOverlay={props.onCloseByOverlay}
      onCloseByEsc={props.onCloseByEsc}
      onSubmit={handleSubmit}
      resetForm={resetForm}
      isOpenFormValid={handleOpenForm}
      isFormValid={isFormValid}
      isLoading={props.isLoading}
    >
      <input
        type="text"
        name="name"
        id="input-name"
        className={`form__input ${errors.name & errors.name !== '' ? "form__input_type_error" : ""}`}
        required
        minLength="2"
        maxLength="40"
        value={`${values.name ? values.name : name}`}
        onChange={handleChange}
      />
      <span
        name="name"
        className={`form__input-error ${!isFormValid ? "form__input-error_active" : ""}`}>
          {`${errors.name ? errors.name : ''}`}
      </span>
      <input
        type="text"
        name="about"
        id="input-about"
        className={`form__input ${errors.about & errors.about !== '' ? "form__input_type_error" : ""}`}
        required
        minLength="2"
        maxLength="200"
        value={`${values.about ? values.about : about}`}
        onChange={handleChange}
      />
      <span
        name="about"
        className={`form__input-error ${!isFormValid ? "form__input-error_active" : ""}`}>{
        `${errors.about ? errors.about : ''}`}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
