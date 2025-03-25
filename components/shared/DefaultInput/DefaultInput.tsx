import React from 'react';
import s from './DefaultInput.module.scss';

const DefaultInput = (
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
) => {
  return <input {...props} className={s.input} />;
};

export default DefaultInput;
