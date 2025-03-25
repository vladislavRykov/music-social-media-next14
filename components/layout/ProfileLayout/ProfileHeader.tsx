'use client';
import React from 'react';
import s from './ProfileHeader.module.scss';
import ProfileCap from './ProfileCap/ProfileCap';
import ProfNav from './ProfNav/ProfNav';

const ProfileHeader = () => {
  return (
    <>
      <ProfileCap />
      <ProfNav />
    </>
  );
};

export default ProfileHeader;
