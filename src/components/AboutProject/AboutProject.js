import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__wrapper">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__content">
          <div className="about-project__content-wrapper">
            <h3 className="about-project__content-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__content-text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__content-wrapper">
            <h3 className="about-project__content-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__content-text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__table">
          <ul className="about-project__table-head">
            <li className="about-project__table-title">1 неделя</li>
            <li className="about-project__table-title about-project__table-title_color">
              4 недели
            </li>
          </ul>
          <ul className="about-project__table-body">
            <li className="about-project__table-text">Back-end</li>
            <li className="about-project__table-text about-project__table-text_size">
              Front-end
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
