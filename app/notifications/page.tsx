import { getMyFriendRequests } from '@/actions/user';
import NotificationsPage from '@/pages/NotificationsPage/NotificationsPage';
import React from 'react';

const page = async () => {
  const friendRequests = await getMyFriendRequests();
  //   console.log(2222, friendRequests, 3333, friendRequests?.data?.[0].from);
  return (
    <NotificationsPage
      responseInfo={{ ok: friendRequests.ok, message: friendRequests.message }}
      friendsRequests={friendRequests.data}
    />
  );
};

export default page;
