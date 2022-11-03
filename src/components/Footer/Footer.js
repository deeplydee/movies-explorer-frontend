import './Footer.css';

function Footer() {
  return (
    <section className="footer">
      <div className="footer__wrapper">
        <h3 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h3>
        <div className="footer__content">
          <p className="footer__date">© {new Date().getFullYear()}</p>
          <div className="footer__nav">
            <a
              href="https://practicum.yandex.ru/"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
            <a
              href="https://github.com/deeplydee"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
