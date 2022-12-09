import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

import './Register.css';

import logo from '../../images/logo.svg';

function Register({handleRegister, errorMessage}) {

  const {
    register,
    formState: {
      errors,
      isValid,
    },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange'
  });


  const onSubmit = (data) => {
    handleRegister(data);
    // reset();
  }

  return (
    <section className="register">
      <div className="register__wrapper">
        <Link className="register__link" to="/">
          <img
            className="register__logo"
            src={logo}
            alt="Лого Исследователь фильмов"
          />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form
          className="register__form"
          name="register"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="register__label-input" htmlFor="register-name-input">
            Имя
          </label>
          <input
            {
              ...register('name', {
                required: 'Поле обязательно к заполнению',
                pattern: {
                  value: /^[а-яА-ЯёЁa-zA-Z\s-]+$/ig,
                  message: 'Введите корректное имя'
                },
                minLength: {
                  value: 2,
                  message: 'Не менее 2 символов'
                },
                maxLength: {
                  value: 30,
                  message: 'Не более 30 символов'
                },
              })
            }
            className={errors?.name ? 'register__data-input register__data-input-invalid' : 'register__data-input'}
            type="text"
            name="name"
            placeholder="Name"
            required
            id="register-name-input"
          />
          <span className="register__error">{errors?.name && errors?.name?.message}</span>
          <label className="register__label-input" htmlFor="register-email-input">
            E-mail
          </label>
          <input
            {
              ...register('email', {
                required: 'Поле обязательно к заполнению',
                validate: {
                  value: v => isEmail(v) || 'Введите корректный email'
                }
              })
            }
            className={errors?.email ? 'register__data-input register__data-input-invalid' : 'register__data-input'}
            type="text"
            name="email"
            placeholder="Email"
            required
            id="register-email-input"
          />
          <span className="register__error">{errors?.email && errors?.email?.message}</span>
          <label className="register__label-input" htmlFor="register-password-input">
            Пароль
          </label>
          <input
            {
              ...register('password', {
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 6,
                  message: 'Не менее 6 символов'
                },
              })
            }
            className={errors?.password ? 'register__data-input register__data-input-invalid' : 'register__data-input'}
            type="password"
            name="password"
            placeholder="Пароль"
            required
            id="register-password-input"
          />
          <span className="register__error">{errors?.password && errors?.password?.message}</span>
          <span className="register__error-auth">{errorMessage}</span>
          <button
            className={isValid ? 'register__form-submit' : 'register__form-submit register__form-submit_disable'}
            type="submit"
            disabled={!isValid}>
              Зарегистрироваться
          </button>
        </form>
        <p className="register__footer">
          Уже зарегистрированы?&nbsp;
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
