import { Link } from 'react-router-dom';

import './Register.css';

import logo from '../../images/logo.svg';

function Register() {
  return (
    <section className="register">
      <div className="register__wrapper">
        <img
          className="register__logo"
          src={logo}
          alt="Лого Исследователь фильмов"
        />
        <h1 className="register__title">Добро пожаловать!</h1>
        <form
          className="register__form"
          name="register"
          // onSubmit={handleSubmit}
        >
          <label className="register__label-input" htmlFor="register-name-input">
            Имя
          </label>
          <input
            className="register__data-input register__data-input_type_register-name"
            type="text"
            name="name"
            placeholder="Name"
            required
            id="register-name-input"
            // value={registerData.email || ''}
            // onChange={handleChange}
          />
          <span className="register__error">Что-то пошло не так...</span>
          <label className="register__label-input" htmlFor="register-email-input">
            E-mail
          </label>
          <input
            className="register__data-input register__data-input_type_register-email"
            type="text"
            name="email"
            placeholder="Email"
            required
            id="register-email-input"
            // value={registerData.email || ''}
            // onChange={handleChange}
          />
          <span className="register__error">Что-то пошло не так...</span>
          <label className="register__label-input" htmlFor="register-password-input">
            Пароль
          </label>
          <input
            className="register__data-input register__data-input_type_register-password"
            type="password"
            name="password"
            placeholder="Пароль"
            required
            id="register-password-input"
            // value={registerData.password || ''}
            // onChange={handleChange}
          />
          <span className="register__error">Что-то пошло не так...</span>
          <button className="register__form-submit" type="submit">
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
