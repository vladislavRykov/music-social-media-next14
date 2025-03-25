'use client';
import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useState } from 'react';
import mockBanner from '@/public/profCap.jpg';
import s from './ProfileCap.module.scss';
import ProfileDataBlock from './ProfileDataBlock/ProfileDataBlock';
import { useAppSelector } from '@/hooks/reduxHooks';
import BannerLoader from '@/components/UI/Loaders/BannerLoader';
import { useRouter } from 'nextjs-toploader/app';
import { useParams } from 'next/navigation';
import { getUserProfByUserName } from '@/dal/user';
import { toast } from 'react-toastify';
import { UserProfileData } from '@/types/types';
import { useLoading } from '@/hooks/useFetching';

const ProfileCap = () => {
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [getUserProfByUserNameF, isLoading] = useLoading(getUserProfByUserName);
  const params: { nickname: string } | null = useParams();
  useEffect(() => {
    const getProfile = async () => {
      if (!params?.nickname) return;
      const data = await getUserProfByUserNameF(params.nickname);

      if (!data) {
        return toast.error('Такого пользователя нет.');
      }
      setProfileData(data);
    };
    getProfile();
  }, [params?.nickname]);

  const [bannerImg, setBannerImg] = useState<null | StaticImageData>(null);

  return (
    <div className={s.wrapper}>
      {isLoading ? (
        <BannerLoader />
      ) : (
        <Image
          className={s.profCap_img}
          width={2500}
          height={1200}
          alt="profCap"
          loading="lazy"
          src={bannerImg || profileData?.banner || mockBanner}
          onError={() => setBannerImg(mockBanner)}
        />
      )}
      <ProfileDataBlock
        userAva={profileData?.avatar}
        username={profileData?.username}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProfileCap;
