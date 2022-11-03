import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './NavTab.css';

function NavTab() {
  const [navTabActive, setNavTabActive] = useState(false);

  return (
    <section className="nav-tab">
      <div
        className={navTabActive ? 'nav-tab__navicon-close' : 'nav-tab__navicon'}
        onClick={() => setNavTabActive(!navTabActive)}
      ></div>
      <div className={ navTabActive ? "nav-tab__opacity" : ''}></div>
      <div
        className={
          navTabActive ? 'nav-tab__wpapper nav-tab__wpapper-visible' : 'nav-tab__wpapper'
        }
      >

        <ul className="nav-tab__list nav-tab__list_type_logged-in">
          <li className="nav-tab__item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'nav-tab__link nav-tab__link-main nav-tab__link-main_type_active active'
                  : 'nav-tab__link nav-tab__link-main'
              }
              exact to="/"
            >
              Главная
            </NavLink>
          </li>
          <li className="nav-tab__item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'nav-tab__link nav-tab__link-movies nav-tab__link-movies_type_active active'
                  : 'nav-tab__link nav-tab__link-movies'
              }
              to="movies"
            >
              Фильмы
            </NavLink>
          </li>
          <li className="nav-tab__item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'nav-tab__link nav-tab__link-movies nav-tab__link-movies_type_active active'
                  : 'nav-tab__link nav-tab__link-movies'
              }
              to="saved-movies"
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <Link
          className="nav-tab__link nav-tab__link-profile nav-tab__link-profile_type_desktop"
          to="profile"
        >
          <span className="nav-tab__text">Аккаунт</span>
          <div className="nav-tab__user-icon"></div>
        </Link>
      </div>
    </section>
  );
}

export default NavTab;
