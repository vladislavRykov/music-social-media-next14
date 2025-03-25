import React from 'react';
import s from './AuthPageLayout.module.scss';

const AuthPageLayout = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <div className={s.authPage}>
      <div className={s.authPage_formBlock}>
        <h1 className={s.authPage_title}>{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default AuthPageLayout;
