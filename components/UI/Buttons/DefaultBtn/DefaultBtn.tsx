import React, { ComponentProps, CSSProperties } from 'react';
import s from './DefaultBtn.module.scss';

interface DefaultBtnProps extends ComponentProps<'button'> {
  btnStyles?: CSSProperties;
}

const DefaultBtn: React.FC<DefaultBtnProps> = ({ btnStyles, className, children, ...rest }) => {
  return (
    <button style={btnStyles} {...rest} className={className + ' ' + s.def_btn}>
      {children}
    </button>
  );
};

export default DefaultBtn;
