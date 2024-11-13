'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import avatar from '@/public/avatar2.webp';
import s from './Profile.module.scss';
import { MdKeyboardArrowDown } from 'react-icons/md';
import ProfileMenu from './ProfileMenu/ProfileMenu';
import { delay } from '@/utils/delay';

const Profile = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={s.wrapper}>
      <div className={s.profileImg_wrapper}>
        <Image
          onMouseOut={() => setIsHovered(false)}
          onMouseOver={() => setIsHovered(true)}
          className={s.profileImg}
          src={avatar}
          height={38}
          width={38}
          alt="avatar"
        />
        <ProfileMenu setIsHovered={setIsHovered} isShown={isHovered} />
      </div>
      <MdKeyboardArrowDown
        onMouseOut={() => setIsHovered(false)}
        onMouseOver={() => setIsHovered(true)}
        size={20}
        className={s.profileImg_arrow}
      />
    </div>
  );
};

export default Profile;
