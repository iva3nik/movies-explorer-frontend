import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <div className='nav-tab'>
      <nav className='nav-tab__links'>
        <a href='#about-project' className='nav-tab__link'>О проекте</a>
        <a href='#techs' className='nav-tab__link'>Технологии</a>
        <a href='#about-me' className='nav-tab__link'>Студент</a>
      </nav>
    </div>
  );
}

export default NavTab;