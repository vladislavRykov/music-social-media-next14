import React, { PropsWithChildren } from 'react';
import s from './ProfileBlock.module.scss';

interface Props extends PropsWithChildren {
  title: string;
}

const ProfileBlock = ({ title, children }: Props) => {
  return (
    <div className={s.profileBlock}>
      <h2 className={s.profileBlock_title}>{title}</h2>
      <div className={s.profileBlock_children}>{children}</div>
    </div>
  );
};

export default ProfileBlock;
