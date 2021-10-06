import React from 'react';
import './Account.css';
import account from '../../images/account_logo.svg';

function Account() {
  return (
    <div className='account'>
      <p className='account__name'>Аккаунт</p>
      <img className='account__logo' src={account} alt='Ярлык аккаунта' />
    </div>
  );
};

export default Account;