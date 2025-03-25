import React, { ComponentProps } from 'react';
import s from './IconBtn.module.scss';
import cn from 'classnames';

interface IconBtnProps extends ComponentProps<'button'> {
  overlayStyles?: React.CSSProperties;
}

const IconBtn: React.FC<IconBtnProps> = ({ children, className, overlayStyles, ...rest }) => {
  return (
    <div className={className}>
      <button {...rest} className={cn(s.iconBtn)}>
        <div className={s.iconBtn_iconWrap}>{children}</div>
        <div className={s.iconBtn_circle} style={overlayStyles}></div>
      </button>
    </div>
  );
};

export default IconBtn;
