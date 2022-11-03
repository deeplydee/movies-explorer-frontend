import { Link, NavLink } from 'react-router-dom';

import './Navigation.css';

import logo from '../../images/logo.svg';

function Navigation({ loggedIn }) {
  return (
    <nav className="navigation">
      <Link className="navigation__link" to="/">
        <img
          className="navigation__logo"
          src={logo}
          alt="Логотип Исследователь фильмов"
        />
      </Link>

      {loggedIn ? (
        <>
          <ul className="navigation__list navigation__list_type_logged-in">
            <li className="navigation__item">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'navigation__link navigation__link-movies navigation__link-movies_type_active active'
                    : 'navigation__link navigation__link-movies'
                }
                to="movies"
              >
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'navigation__link navigation__link-movies navigation__link-movies_type_active active'
                    : 'navigation__link navigation__link-movies'
                }
                to="saved-movies"
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <Link
            className="navigation__link navigation__link-profile navigation__link-profile_type_desktop"
            to="profile"
          >
            <span className="navigation__text">Аккаунт</span>
            <div className="navigation__user-icon"></div>
          </Link>
        </>
      ) : (
        <>
          <ul className="navigation__list navigation__list_type_logged-out">
            <li className="navigation__item">
              <Link
                className="navigation__link navigation__link-signup"
                to="/signup"
              >
                Регистрация
              </Link>
            </li>
            <li className="navigation__item">
              <Link
                className="navigation__link navigation__link-signin"
                to="/signin"
              >
                Войти
              </Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
}

export default Navigation;
