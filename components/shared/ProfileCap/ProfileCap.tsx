import Image from 'next/image';
import React from 'react';
import profCap from '@/public/profCap.jpg';
import s from './ProfileCap.module.scss';
import ProfileDataBlock from './ProfileDataBlock/ProfileDataBlock';

const ProfileCap = () => {
  return (
    <div className={s.wrapper}>
      <Image className={s.profCap_img} src={profCap} width={2500} height={1398} alt="profCap" />
      <ProfileDataBlock />
    </div>
  );
};

export default ProfileCap;
