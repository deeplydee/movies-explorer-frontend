import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

import './Login.css';

import logo from '../../images/logo.svg';

function Login({ handleLogin, errorMessage }) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    handleLogin(data);
  };

  return (
    <section className="login">
      <div className="login__wrapper">
        <Link className="login__link" to="/">
          <img
            className="login__logo"
            src={logo}
            alt="Лого Исследователь фильмов"
          />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form
          className="login__form"
          name="login"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="login__label-input" htmlFor="login-email-input">
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
                ? 'login__data-input login__data-input-invalid'
                : 'login__data-input'
            }
            type="text"
            name="email"
            placeholder="Email"
            required
            id="login-email-input"
          />
          <span className="login__error">
            {errors?.email && errors?.email?.message}
          </span>
          <label className="login__label-input" htmlFor="login-password-input">
            Пароль
          </label>
          <input
            {...register('password', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 6,
                message: 'Не менее 6 символов',
              },
            })}
            className={
              errors?.password
                ? 'login__data-input login__data-input-invalid'
                : 'login__data-input'
            }
            type="password"
            name="password"
            placeholder="Пароль"
            required
            id="login-password-input"
          />
          <span className="login__error">
            {errors?.password && errors?.password?.message}
          </span>
          <span className="login__error-auth">{errorMessage}</span>
          <button
            className={
              isValid
                ? 'login__form-submit'
                : 'login__form-submit login__form-submit_disable'
            }
            type="submit"
            disabled={!isValid}
          >
            Войти
          </button>
        </form>
        <p className="login__footer">
          Ещё не зарегистрированы?&nbsp;
          <Link to="/signup" className="login__link">
            Регистрация
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
