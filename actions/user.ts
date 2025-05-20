'use server';
import { createRelation, isUserBlocked, isUsersFriends, isUsersHaveRelation } from '@/dal/relation';
import {
  changeFriendRequestStatus,
  checkIfRequestExists,
  countUserFriendRequests,
  getCurrentUserFriendRequests,
  pushNewFriendRequest,
  searchUsersByUsername,
  searchUsersByUsernameScroll,
} from '@/dal/user';
import { verifySession } from '@/lib/sessions';
import { addFriendRequestT, FriendRequestStatus, RelationStatus } from '@/types/relationT';
import { UserProfileData } from '@/types/types';

export const searchUsersByUsernameA = async ({
  searchValue,
  lastPostId,
}: {
  searchValue: string;
  lastPostId: string | null;
}) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const users = await searchUsersByUsernameScroll<UserProfileData[]>({
      searchString: searchValue,
      currentUserId: session.userId,
      lastPostId,
      selectedFields: ['avatar', 'username', '_id'],
    });
    return { ok: true, data: users, message: 'Пользователи найдены.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};

export const sendFriendRequest = async (to: string) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }
    const isHaveRelation = await isUsersHaveRelation({currentUserId: session.userId,otherUserId:to })
    if(isHaveRelation) return { ok: false, message: 'Вы либо заблокированы либо уже друг пользователя.' };
    const isExist = await checkIfRequestExists(to, session.userId,FriendRequestStatus.Pending);
    if (isExist) return { ok: false, message: 'Запрос уже отправлен.' };
    await pushNewFriendRequest(to, { from: session.userId });
    return { ok: true, message: 'Запрос дружбы успешно отправлен.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: 'Неизвестная ошибка.' };
  }
};
export const getMyFriendRequests = async () => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const friendRequests = await getCurrentUserFriendRequests(session.userId);
    if (!friendRequests) return { ok: false, data: null, message: 'Запросов нет.' };
    return { ok: true, data: friendRequests, message: 'Запросы получены.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};
export const changeFriendRequestStatusA = async (
  requestId: string,
  from: string,
  status: FriendRequestStatus,
) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }
    if (status === FriendRequestStatus.Accepted) {
      const oldFriendRequest = await changeFriendRequestStatus(session.userId, requestId, status);
      if (!oldFriendRequest)
        return { ok: false, data: null, message: 'Не удалось изменеить статус запроса.' };
      const isRelationExists = await isUsersHaveRelation({
        currentUserId: session.userId,
        otherUserId: from,
      });
      if (isRelationExists)
        return {
          ok: false,
          data: null,
          message: 'Пользователь либо заблокирован либо уже ваш друг.',
        };
      const relation = await createRelation({
        currentUserId: session.userId,
        otherUserId: from,
        status: RelationStatus.Friends,
      });
  
      return { ok: true, message: 'Пользователь был добавлен в друзья.' };
    } else {
      const oldFriendRequest = await changeFriendRequestStatus(session.userId, from, status);
      if (!oldFriendRequest)
        return { ok: false, data: null, message: 'Не удалось изменеить статус запроса.' };

      return { ok: true, message: 'Запрос на дружбу был отклонен' };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: 'Неизвестная ошибка.' };
  }
};
