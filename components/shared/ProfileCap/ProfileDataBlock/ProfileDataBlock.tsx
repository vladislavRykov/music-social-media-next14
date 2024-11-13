import React from 'react';
import s from './ProfileDataBlock.module.scss';
import Image from 'next/image';
import avatar from '@/public/avatar2.webp';

const ProfileDataBlock = () => {
  return (
    <div className={s.wrapper}>
      <Image
        className={s.ProfileDataBlock_img}
        src={avatar}
        height={160}
        width={160}
        alt="profile image"
      />
      <h1 className={s.ProfileDataBlock_nickname}>SuperKiller12345</h1>
    </div>
  );
};

export default ProfileDataBlock;
