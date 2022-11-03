import { Link } from 'react-router-dom';

import './Profile.css';

function Profile() {
  return (
    <section className="profile">
      <div className="profile__content">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form
          className="profile__form"
          name="profile"
          // onSubmit={handleSubmit}
        >
          <div className="profile__content-input profile__content-input_style_border">
            <label
              className="profile__label-input"
              htmlFor="profile-name-input"
            >
              Имя
            </label>
            <input
              className="profile__data-input profile__data-input_type_profile-name"
              type="text"
              name="name"
              placeholder="Имя"
              required
              id="profile-name-input"
              // value={profileData.email || ''}
              // onChange={handleChange}
            />
            <span className="profile__error">Что-то пошло не так...</span>
          </div>
          <div className="profile__content-input">
            <label
              className="profile__label-input"
              htmlFor="profile-email-input"
            >
              E-mail
            </label>
            <input
              className="profile__data-input profile__data-input_type_profile-email"
              type="text"
              name="email"
              placeholder="Email"
              required
              id="profile-email-input"
              // value={profileData.email || ''}
              // onChange={handleChange}
            />
            <span className="profile__error">Что-то пошло не так...</span>
          </div>
          <button className="profile__form-submit" type="submit">
            Редактировать
          </button>
          <Link to="/sign-in" className="profile__signout">
            Выйти из аккаунта
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Profile;
