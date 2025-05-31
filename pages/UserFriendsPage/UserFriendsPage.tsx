import { UserProfileData } from '@/types/types';
import s from './UserFriendsPage.module.scss'
import React from 'react';
import FriendList from '@/components/FriendsPage/FriendList/FriendList';



const UserFriendsPage = () => {
  return <div className={s.userFriendsPage}>
    <FriendList/>
  </div>;
};

export default UserFriendsPage;
