import React, { useEffect } from 'react';
import s from './MainLayout.module.scss';
import Header from './Header/Header';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '@/services/api/api';
import PlayerFooter from '@/components/shared/PlayerFooter/PlayerFooter';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={s.wrapper}>
      <Header />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        transition={Flip}
      />
      <div className={s.main}>{children}</div>
      <PlayerFooter />
    </div>
  );
};

export default MainLayout;
