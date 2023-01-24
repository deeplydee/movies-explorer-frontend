import './AboutMe.css';

import face from '../../images/face.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__wrapper">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__profile">
          <div className="about-me__text">
            <h3 className="about-me__name">Дмитрий</h3>
            <p className="about-me__desk">Фронтенд-разработчик, 33 года</p>
            <p className="about-me__info">
              Я учусь в Яндекс.Практикуме
            </p>
            <a
              href="https://github.com/deeplydee"
              className="about-me__github"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
          <img className="about-me__face-pic" src={face} alt="Аватар"></img>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
