import React from 'react';
import './Account.css';
import account from '../../images/account_logo.svg';

function Account({ emailUser }) {
  return (
    <div className='account'>
      <p className='account__name'>{emailUser}</p>
      <img className='account__logo' src={account} alt='Ярлык аккаунта' />
    </div>
  );
};

export default Account;