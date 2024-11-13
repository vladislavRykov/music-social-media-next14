import React from 'react';
import s from './MainLayout.module.scss';
import Header from './Header/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isAuth = false
  return (
    <div className={s.wrapper}>
      {isAuth ? <Header /> : <UnAuthorizedHeader/>}
      <div className={s.main}>{children}</div>
    </div>
  );
};

export default MainLayout;
