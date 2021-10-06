import React from 'react';
import './Portfolio.css';
import needle from '../../images/needle.svg';
import { Link } from 'react-router-dom';

function Portfolio() {
  return (
    <div className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <nav className='portfolio__navigation'>
        <Link
          to={{ pathname: 'https://iva3nik.github.io/how-to-learn/index.html' }}
          target='_blank'
          className='portfolio__example'
        >
          <p className='portfolio__name-project'>Статичный сайт</p>
          <img className='portfolio__needle' src={needle} alt='Стрелка для перехода по ссылке' />
        </Link>
        <Link
          to={{ pathname: 'https://iva3nik.github.io/russian-travel/' }}
          target='_blank'
          className='portfolio__example'
        >
          <p className='portfolio__name-project'>Адаптивный сайт</p>
          <img className='portfolio__needle' src={needle} alt='Стрелка для перехода по ссылке' />
        </Link>
        <Link
          to={{ pathname: 'https://domainmesto.nomoredomains.rocks' }}
          target='_blank'
          className='portfolio__example'
        >
          <p className='portfolio__name-project'>Одностраничное приложение</p>
          <img className='portfolio__needle' src={needle} alt='Стрелка для перехода по ссылке' />
        </Link>
      </nav>
    </div>
  );
}

export default Portfolio;