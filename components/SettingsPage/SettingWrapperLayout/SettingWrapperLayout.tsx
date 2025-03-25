import React from 'react';
import s from './SettingWrapperLayout.module.scss';

interface SettingWrapperLayoutProps {
  title: string;
  desc?: string;
  titleStyles?: React.CSSProperties;
}

const SettingWrapperLayout: React.FC<React.PropsWithChildren<SettingWrapperLayoutProps>> = ({
  children,
  title,
  desc,
  titleStyles = {},
}) => {
  return (
    <div className={s.settingWrapperLayout}>
      <div
        style={desc ? { ...titleStyles, marginBottom: '5px' } : titleStyles}
        className={s.settingWrapperLayout_title}>
        {title}
      </div>
      {desc && <p className={s.settingWrapperLayout_desc}>{desc}</p>}
      {children}
    </div>
  );
};

export default SettingWrapperLayout;
