import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__wrapper">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a
              href="https://deeplydee.github.io/how-to-learn/"
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
            >
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__item">
            <a
              href="https://deeplydee.github.io/russian-travel/"
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
            >
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__item">
            <a
              href="https://deeplydee.nomoredomains.icu"
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
            >
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
