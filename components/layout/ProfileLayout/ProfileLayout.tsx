import React from 'react';
import ProfileCap from './ProfileCap/ProfileCap';
import ProfNav from './ProfNav/ProfNav';
import ProfileHeader from './ProfileHeader';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProfileHeader />
      {children}
    </>
  );
};
export default ProfileLayout;
