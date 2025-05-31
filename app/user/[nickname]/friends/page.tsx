import { getUserFriendsByUsername } from '@/actions/relations';
import UserFriendsPage from '@/pages/UserFriendsPage/UserFriendsPage';
import React from 'react';

const page = async ({ params }: { params: { nickname: string }; searchParams: {} }) => {

  return <UserFriendsPage />;
};

export default page;
