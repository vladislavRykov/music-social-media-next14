import React from 'react';
import s from './BlueBtn.module.scss';

interface BlueBtnProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
}

const BlueBtn: React.FC<BlueBtnProps> = ({ children, ...rest }) => {
  return (
    <button {...rest} className={s.blueBtn}>
      {children}
    </button>
  );
};

export default BlueBtn;
