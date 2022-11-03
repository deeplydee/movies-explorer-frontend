import { Link } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {
  return (
    <section className="page-not-found">
      <div className="page-not-found__wrapper">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__subtitle">Страница не найдена</p>
      </div>
      <Link className="page-not-found__link" to="/">
        Назад
      </Link>
    </section>
  );
}

export default PageNotFound;
