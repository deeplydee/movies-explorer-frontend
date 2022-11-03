import { Link } from 'react-router-dom';

import './Login.css';

import logo from '../../images/logo.svg';

function Login() {
  return (
    <section className="login">
      <div className="login__wrapper">
        <img
          className="login__logo"
          src={logo}
          alt="Лого Исследователь фильмов"
        />
        <h1 className="login__title">Рады видеть!</h1>
        <form
          className="login__form"
          name="login"
          // onSubmit={handleSubmit}
        >
          <label className="login__label-input" htmlFor="login-email-input">
            E-mail
          </label>
          <input
            className="login__data-input login__data-input_type_login-email"
            type="text"
            name="email"
            placeholder="Email"
            required
            id="login-email-input"
            // value={loginData.email || ''}
            // onChange={handleChange}
          />
          <span className="login__error">Что-то пошло не так...</span>
          <label className="login__label-input" htmlFor="login-password-input">
            Пароль
          </label>
          <input
            className="login__data-input login__data-input_type_login-password"
            type="password"
            name="password"
            placeholder="Пароль"
            required
            id="login-password-input"
            // value={loginData.password || ''}
            // onChange={handleChange}
          />
          <span className="login__error">Что-то пошло не так...</span>
          <button className="login__form-submit" type="submit">
            Войти
          </button>
        </form>
        <p className="login__footer">
          Ещё не зарегистрированы?&nbsp;
          <Link to="/signin" className="login__link">
            Регистрация
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
