import React from 'react';
import { IconType } from 'react-icons/lib';
import s from './DefaultPostOption.module.scss';

type DefaultPostOptionProps = {
  title: string;
  Icon: IconType;
  action: React.MouseEventHandler<HTMLDivElement>;
  color?: string;
};

const DefaultPostOption: React.FC<DefaultPostOptionProps> = ({ title, Icon, action, color }) => {
  return (
    <div className={s.defaultPostOption} onClick={action}>
      <Icon className={s.defaultPostOption_icon} color={color} />
      <div className={s.defaultPostOption_title} style={{ color }}>
        {title}
      </div>
    </div>
  );
};

export default DefaultPostOption;
