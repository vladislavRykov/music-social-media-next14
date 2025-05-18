'use client';
import React, { useEffect, useState } from 'react';
import s from './ProfileDataBlock.module.scss';
import Image, { StaticImageData } from 'next/image';
import defaultAvatar from '@/public/avatars/default.jpg';
import { getMe, getUserMainFields } from '@/dal/user';
import { UserDataMongoose, UserMainFields } from '@/types/types';
import { useAppSelector } from '@/hooks/reduxHooks';
import AvatarLoader from '@/components/UI/Loaders/AvatarLoader';

const ProfileDataBlock = ({
  userAva,
  username,
  isLoading,
}: {
  userAva: string | undefined;
  username: string | undefined;
  isLoading: boolean;
}) => {
  const [srcImg, setSrcImg] = useState<null | StaticImageData>(null);
  // useEffect(() => {
  //   !isLoading && userAva ? setSrcImg(userAva) : setSrcImg(mockAvatar);
  // }, [userAva, isLoading]);
  return (
    <div className={s.wrapper}>
      {isLoading ? (
        <AvatarLoader />
      ) : (
        <>
          <Image
            className={s.ProfileDataBlock_img}
            height={160}
            width={160}
            alt="profile image"
            loading="lazy"
            src={srcImg || userAva || defaultAvatar}
            placeholder="blur"
            blurDataURL={'/loader1.gif'}
            onError={() => setSrcImg(defaultAvatar)}
          />
          <h1 className={s.ProfileDataBlock_nickname}>{username || 'Имя пользователя'}</h1>
        </>
      )}
    </div>
  );
};

export default ProfileDataBlock;
