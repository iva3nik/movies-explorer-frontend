import React from 'react';
import './AboutMe.css';
import photo from '../../images/photo.png';
import { Link } from 'react-router-dom';

function AboutMe() {
  return (
    <div className='about-me' id='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__content'>
        <div className='about-me__column'>
          <div className='about-me__text-part'>
            <h3 className='about-me__name'>Иван</h3>
            <h4 className='about-me__position'>Фронтенд-разработчик, 28 лет</h4>
            <p className='about-me__info'>
              Я родился в Обнинске и живу в Москве, закончил факультет специального машиностроения
              в МГТУ им. Н.Э.Баумана. Люблю игровые виды спорта и кататься на разных досках.
              Недавно начал кодить. С 2018 года работал в компании «3Д Дисплей».
              На данный момент заканчиваю курс по веб-разработке и начал изучать английский язык.
            </p>
          </div>
          <nav className='about-me__links'>
            <Link
              to={{ pathname: 'https://www.instagram.com/iva3nik/' }}
              target='_blank'
              className='about-me__link'
            >
              Instagram
            </Link>
            <Link
              to={{ pathname: 'https://github.com/iva3nik' }}
              target='_blank'
              className='about-me__link'
            >
              Github
            </Link>
          </nav>
        </div>
        <img className='about-me__photo' src={photo} alt='Фото студента' />
      </div>
    </div>
  );
}

export default AboutMe;