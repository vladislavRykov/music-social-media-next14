import React from 'react';
import s from './NotAuthProfile.module.scss';
import Link from 'next/link';

const NotAuthProfile = () => {
  return (
    <div className={s.authorization}>
      <Link className={s.authorization_login} href={'/login'}>
        Вход
      </Link>
      <Link className={s.authorization_signup} href={'/signup'}>
        Регистрация
      </Link>
    </div>
  );
};

export default NotAuthProfile;
