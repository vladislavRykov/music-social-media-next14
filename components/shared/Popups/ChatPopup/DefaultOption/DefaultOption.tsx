import React from 'react';
import { IconType } from 'react-icons/lib';
import s from './DefaultOption.module.scss';

type DefaultOptionProps = {
  title: string;
  Icon: IconType;
  action: React.MouseEventHandler<HTMLDivElement>;
  color?: string;
};

const DefaultOption: React.FC<DefaultOptionProps> = ({ title, Icon, action, color }) => {
  return (
    <div
      className={s.defaultOption}
      onClick={(e) => {
        e.stopPropagation();
        action(e);
      }}>
      <Icon className={s.defaultOption_icon} color={color} />
      <div className={s.defaultOption_title} style={{ color }}>
        {title}
      </div>
    </div>
  );
};

export default DefaultOption;
