import { getUserFriendsByUsername } from '@/actions/relations';
import UserFriendsPage from '@/pages/UserFriendsPage/UserFriendsPage';
import React from 'react';

const page = async ({ params }: { params: { nickname: string }; searchParams: {} }) => {
  const res = await getUserFriendsByUsername(params.nickname);
  console.log(res);
  return <UserFriendsPage friends={res.data} isOk={res.ok} message={res.message}/>;
};

export default page;
