import './Promo.css';

import promoLogo from '../../images/promo-logo.svg';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__wrapper">
        <div className="promo__title-wrapper">
          <div className="promo__title-content">
            <h1 className="promo__title">
              Учебный проект студента факультета Веб-разработки.
            </h1>
            <p className="promo__subtitle">
              Листайте ниже, чтобы узнать больше про этот проект и его
              создателя.
            </p>
          </div>
          <img
            className="promo__landing-logo"
            src={promoLogo}
            alt="Лого Планета Земля"
          />
        </div>
        {/* <button
          className="promo__about"
          type="button"
          aria-label="Узнать больше"
          href="#about-project"
        >
          Узнать больше
          <a href='#about-project'>
        </a>
        </button> */}
        <a className='promo__about' href='#about-project'>
          Узнать больше
        </a>
      </div>
    </section>
  );
}

export default Promo;
