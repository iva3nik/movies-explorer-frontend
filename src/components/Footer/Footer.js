import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer'>
      <div className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</div>
      <div className='footer__container'>
        <p className='footer__copyrights'>&copy; 2021</p>
        <div className='footer__links-container'>
          <Link
            to={{ pathname: 'https://practicum.yandex.ru/' }}
            target='_blank'
            className='footer__link'
          >
            Яндекс.Практикум
          </Link>
          <Link
            to={{ pathname: 'https://github.com/' }}
            target='_blank'
            className='footer__link'
          >
            Github
          </Link>
          <Link
            to={{ pathname: 'https://www.facebook.com/yandex.practicum' }}
            target='_blank'
            className='footer__link'
          >
            Facebook
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;