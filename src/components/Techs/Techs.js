import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <div className='techs' id='techs'>
      <h2 className='techs__title'>Технологии</h2>
      <h3 className='techs__subtitle'>7 технологий</h3>
      <p className='techs__text'>
        На курсе веб-разработки мы освоили технологии,
        которые применили в дипломном проекте.
      </p>
      <div className='techs__container'>
        <div className='techs__brick'>HTML</div>
        <div className='techs__brick'>CSS</div>
        <div className='techs__brick'>JS</div>
        <div className='techs__brick'>React</div>
        <div className='techs__brick'>Git</div>
        <div className='techs__brick'>Express.js</div>
        <div className='techs__brick'>MongoDB</div>
      </div>
    </div>
  );
}

export default Techs;