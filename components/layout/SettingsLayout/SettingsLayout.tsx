import React from 'react';
import s from './SettingsLayout.module.scss';
import SettingsNavBar from './SettingsNavBar/SettingsNavBar';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <SettingsNavBar />
        <div className={s.page}>{children}</div>
      </div>
    </div>
  );
};

export default SettingsLayout;
