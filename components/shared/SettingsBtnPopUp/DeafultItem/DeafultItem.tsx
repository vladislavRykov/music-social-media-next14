import React from 'react';
import { IconType } from 'react-icons/lib';
import s from './DeafultItem.module.scss';

type DeafultItemProps = {
  title: string;
  Icon: IconType;
  action: () => void;
};

const DeafultItem: React.FC<DeafultItemProps> = ({ title, Icon, action }) => {
  return (
    <div className={s.deafultItem} onClick={action}>
      <Icon className={s.deafultItem_icon} />
      <div className={s.deafultItem_title}>{title}</div>
    </div>
  );
};

export default DeafultItem;
