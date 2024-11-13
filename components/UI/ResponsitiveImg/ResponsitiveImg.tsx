import Image from 'next/image';
import React, { ComponentProps } from 'react';
import s from './ResponsitiveImg.module.scss';
import cn from 'classnames';

interface ResponsitiveImgProps extends ComponentProps<typeof Image> {}

const ResponsitiveImg: React.FC<ResponsitiveImgProps> = ({ className, ...rest }) => {
  return (
    <div className={s.wrapper}>
      <Image className={cn(s.img, className)} {...rest} />
    </div>
  );
};

export default ResponsitiveImg;
