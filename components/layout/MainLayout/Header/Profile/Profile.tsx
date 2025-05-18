'use client';
import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useState } from 'react';
import defaultAvatar from '@/public/avatars/default.jpg';
import s from './Profile.module.scss';
import { MdKeyboardArrowDown } from 'react-icons/md';
import ProfileMenu from './ProfileMenu/ProfileMenu';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getUserProfile, setUser } from '@/redux/slices/UserSlice';
import { userSelectedData } from '@/redux/selectors/userSelectors';

const Profile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { userAva, userName, isLoading } = useAppSelector(userSelectedData);
  // const [imgSrc, setImgSrc] = useState<StaticImageData | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserProfile()).then((res) => {
    });
  }, []);
  const [imgSrc, setImgSrc] = useState<StaticImageData | string>(
    isLoading ? '/loader1.gif' : defaultAvatar,
  );

  useEffect(() => {
    if(isLoading) return
    if ( userAva) {
      setImgSrc(userAva);
    }else{
      setImgSrc(defaultAvatar);
    }
  }, [isLoading, userAva]);
  return (
    <div className={s.wrapper}>
      <div className={s.profileImg_wrapper}>
        <Image
          onMouseOut={() => setIsHovered(false)}
          onMouseOver={() => setIsHovered(true)}
          className={s.profileImg}
          src={imgSrc}
          // src={isLoading ? '/loader1.gif' : imgSrc || userAva || mockAvatar}
          height={38}
          width={38}
          alt="avatar"
          onError={() => setImgSrc(defaultAvatar)}
        />

        <ProfileMenu
          userName={userName}
          setIsHovered={setIsHovered}
          isShown={isHovered}
          // isShown={true}
        />
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
