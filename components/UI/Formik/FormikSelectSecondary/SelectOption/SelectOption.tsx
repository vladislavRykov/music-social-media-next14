import React from 'react';
import s from './SelectOption.module.scss';
import { AccessType } from '@/types/common';
import { IconType } from 'react-icons/lib';
import { Option } from '../FormikSelectSecondary';

interface SelectOptionProps extends Option {
  selectOption: () => void;
}

const SelectOption: React.FC<SelectOptionProps> = ({ selectOption, value, label, desc, Icon }) => {
  return (
    <div className={s.option} onClick={selectOption}>
      <Icon className={s.option_icon} size={20} />
      <div className={s.option_text}>
        <h2 className={s.option_label}>{label}</h2>
        <p className={s.option_desc}>{desc}</p>
      </div>
    </div>
  );
};

export default SelectOption;
