'use server';
import {
  checkIfRequestExists,
  getCurrentUserFriendRequests,
  pushNewFriendRequest,
  searchUsersByUsername,
  searchUsersByUsernameScroll,
} from '@/dal/user';
import { verifySession } from '@/lib/sessions';
import { addFriendRequestT } from '@/types/relationT';
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
    const isExist = await checkIfRequestExists(to, session.userId);
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
      return { ok: false, data:null,message: 'Вы не авторизированы' };
    }
    const friendRequests = await getCurrentUserFriendRequests(session.userId);
    if (!friendRequests) return { ok: false,data:null, message: 'Не удалось получить запросы дружбы.' };
    return { ok: true,data: friendRequests ,message: 'Запрос дружбы успешно отправлен.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false,data:null, message: error.message };
    }
    return { ok: false,data:null, message: 'Неизвестная ошибка.' };
  }
};
