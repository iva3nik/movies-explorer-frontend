import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <>
      <div className='about-project' id='about-project'>
        <h2 className='about-project__title'>О проекте</h2>
        <div className='about-project__content'>
          <div className='about-project__column'>
            <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
            <p className='about-project__text'>
              Составление плана, работу над бэкендом, вёрстку,
              добавление функциональности и финальные доработки.
            </p>
          </div>
          <div className='about-project__column'>
            <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
            <p className='about-project__text'>
              У каждого этапа был мягкий и жёсткий дедлайн,
              которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className='about-project__boot-strip'>
          <div className='about-project__strip-column'>
            <div className='about-project__indicate'>1 неделя</div>
            <div className='about-project__indicate-name'>Back-end</div>
          </div>
          <div className='about-project__strip-column about-project__strip-column_front-end'>
            <div className='about-project__indicate about-project__indicate_front-end'>4 недели</div>
            <div className='about-project__indicate-name'>Front-end</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutProject;