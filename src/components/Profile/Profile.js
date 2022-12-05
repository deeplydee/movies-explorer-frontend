import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './Profile.css';

function Profile({ onSignOut, onUpdateUser, errorInfoText }) {
  const currentUser = useContext(CurrentUserContext);
  const { name, email } = currentUser;

  const [newCurrentUserName, setNewCurrentUserName] = useState(name);
  const [newCurrentUserEmail, setNewCurrentUserEmail] = useState(email);

  useEffect(() => {
    submitIsValid();
    setNewCurrentUserName(currentUser.name);
    setNewCurrentUserEmail(currentUser.email);
  }, [currentUser, onUpdateUser]);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    },
  });

  const watchNameInput = watch('name');
  const watchEmailInput = watch('email');

  const submitIsValid = () => {
    if (isValid && (watchNameInput !== name || watchEmailInput !== email)) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = (data) => {
    onUpdateUser(data);
    reset({});
  };

  return (
    <section className="profile">
      <div className="profile__content">
        <h1 className="profile__title">{`Привет, ${
          currentUser.name
        }!`}</h1>
        <form
          className="profile__form"
          name="profile"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="profile__content-input profile__content-input_style_border">
            <label
              className="profile__label-input"
              htmlFor="profile-name-input"
            >
              Имя
            </label>
            <input
              {...register('name', {
                required: 'Поле обязательно к заполнению',
                pattern: {
                  value: /^[а-яА-ЯёЁa-zA-Z\s-]+$/gi,
                  message: 'Введите корректное имя',
                },
                minLength: {
                  value: 2,
                  message: 'Не менее 2 символов',
                },
                maxLength: {
                  value: 30,
                  message: 'Не более 30 символов',
                },
              })}
              className={
                errors?.name
                  ? 'profile__data-input profile__data-input-invalid'
                  : 'profile__data-input'
              }
              type="text"
              name="name"
              placeholder="Имя"
              required
              id="profile-name-input"
            />
            <span className="profile__error">
              {errors?.name && errors?.name?.message}
            </span>
          </div>
          <div className="profile__content-input">
            <label
              className="profile__label-input"
              htmlFor="profile-email-input"
            >
              E-mail
            </label>
            <input
              {...register('email', {
                required: 'Поле обязательно к заполнению',
                validate: {
                  value: (v) => isEmail(v) || 'Введите корректный email',
                },
              })}
              className={
                errors?.email
                  ? 'profile__data-input profile__data-input-invalid'
                  : 'profile__data-input'
              }
              type="text"
              name="email"
              placeholder="Email"
              required
              id="profile-email-input"
            />
            <span className="profile__error">
              {errors?.email && errors?.email?.message}
            </span>
          </div>
          <span className="profile__error-submit">{errorInfoText}</span>
          <button
            className={
              submitIsValid()
                ? 'profile__form-submit'
                : 'profile__form-submit profile__form-submit_disable'
            }
            type="submit"
            disabled={!submitIsValid()}
          >
            Редактировать
          </button>
          <Link to="/sign-in" className="profile__signout" onClick={onSignOut}>
            Выйти из аккаунта
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Profile;
