'use server';
import {
  createRelation,
  deleteRelation,
  getUserFriends,
  getUsersRelation,
  isUserBlocked,
  updateRelationStatus,
  updateRelationUserOrder,
} from '@/dal/relation';
import {
  changeFriendRequestStatus,
  getUserProfByUserName,
  getUsersByIdArray,
  searchUsersByUsernameScrollArray,
} from '@/dal/user';
import { verifySession } from '@/lib/sessions';
import { Models } from '@/models/models';
import { RelationStatus } from '@/types/relationT';
import { UserProfileData } from '@/types/types';

export const blockUser = async (targetId: string) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }
    if (targetId === session.userId)
      return { ok: false, data: null, message: 'Нельзя заблокировать самого себя.' };
    const existingRelation = await getUsersRelation({
      currentUserId: session.userId,
      otherUserId: targetId,
    });
    if (existingRelation) {
      if (existingRelation.status === RelationStatus.Blocked)
        return { ok: false, data: null, message: 'Пользователь уже заблокирован.' };
      await updateRelationStatus({
        currentUserId: session.userId,
        otherUserId: targetId,
        status: RelationStatus.Blocked,
      });
      await updateRelationUserOrder({ userA: session.userId, userB: targetId });
    } else {
      const relation = await createRelation({
        currentUserId: session.userId,
        otherUserId: targetId,
        status: RelationStatus.Blocked,
      });
    }
    return { ok: true, message: 'Пользователь заблокирован.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};
export const unblockUser = async (targetId: string) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }
    if (targetId === session.userId)
      return { ok: false, message: 'Нельзя разблокировать самого себя.' };
    const existingRelation = await getUsersRelation({
      currentUserId: session.userId,
      otherUserId: targetId,
    });
    if (!existingRelation) return { ok: false, message: 'Пользователь не заблокирован.' };
    if (existingRelation.status === RelationStatus.Friends)
      return { ok: false, message: 'Нельзя разблокировать друга.' };

    await deleteRelation({ currentUserId: session.userId, otherUserId: targetId });
    return { ok: true, message: 'Пользователь разблокирован.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: 'Неизвестная ошибка.' };
  }
};
export const deleteFriend = async (friendId: string) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }
    if (friendId === session.userId)
      return { ok: false, message: 'Нельзя удалить из друзей самого себя.' };
    const existingRelation = await getUsersRelation({
      currentUserId: session.userId,
      otherUserId: friendId,
    });
    if (!existingRelation) return { ok: false, message: 'Пользователя нет в ваших друзьях.' };
    if (existingRelation.status === RelationStatus.Blocked)
      return { ok: false, message: 'Пользователя нет в ваших друзьях.' };

    await deleteRelation({ currentUserId: session.userId, otherUserId: friendId });
    return { ok: true, message: 'Пользователь удален из друзей.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: 'Неизвестная ошибка.' };
  }
};
export const isCurrentUserBlocked = async (blockerUsername: string) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const blockerUserProf = await getUserProfByUserName(blockerUsername);
    if (!blockerUserProf) return { ok: false, data: null, message: 'Пользователь не найден' };

    const isBlocked = await isUserBlocked({
      currentUserId: session.userId,
      otherUserId: blockerUserProf._id,
    });
    return { ok: true, data: isBlocked, message: 'Пользователь заблокирован.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};

export const getUserFriendsByUsername = async (username: string) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const userProf = await getUserProfByUserName(username);
    if (!userProf) return { ok: false, data: null, message: 'Пользователь не найден.' };
    const friendRelation = await getUserFriends({ currentUserId: userProf._id });
    const otherIds: string[] = [];

    for (let doc of friendRelation) {
      if (doc.userA.toString() === userProf._id.toString()) {
        otherIds.push(doc.userB.toString()); // Если usedA соответствует, добавляем usedB
      } else if (doc.userB.toString() === userProf._id.toString()) {
        otherIds.push(doc.userA.toString()); // Иначе используем usedA
      }
    }
    const friendsProfs = await getUsersByIdArray(otherIds);
    return { ok: true, data: friendsProfs, message: 'Профили друзей получены.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};
export const searchUserFriendsByUsername = async (
  searchValue: string,
  username: string,
  lastPostId: string | null,
  limit?:number,
) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const userProf = await getUserProfByUserName(username);
    if (!userProf) return { ok: false, data: null, message: 'Пользователь не найден.' };
    const friendRelation = await getUserFriends({ currentUserId: userProf._id });
    const otherIds: string[] = [];

    for (let doc of friendRelation) {
      if (doc.userA.toString() === userProf._id.toString()) {
        otherIds.push(doc.userB.toString()); // Если usedA соответствует, добавляем usedB
      } else if (doc.userB.toString() === userProf._id.toString()) {
        otherIds.push(doc.userA.toString()); // Иначе используем usedA
      }
    }
   const currentUserId = userProf._id.toString() === session.userId.toString() ? session.userId.toString(): userProf._id.toString()
    const friendsProfs = await searchUsersByUsernameScrollArray<UserProfileData[]>({
      friendsList: otherIds,
      searchString: searchValue,
      currentUserId,
      lastPostId,
      selectedFields: ['avatar', 'username', '_id', 'banner', 'aboutMe'],
      limit,
    });
    return { ok: true, data: friendsProfs, message: 'Профили друзей получены.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};
export const searchCurrentUserFriends = async (
  searchValue: string,
  lastPostId: string | null,
  limit?: number,
) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const friendRelation = await getUserFriends({ currentUserId: session.userId });
    const otherIds: string[] = [];

    for (let doc of friendRelation) {
      if (doc.userA.toString() === session.userId.toString()) {
        otherIds.push(doc.userB.toString()); // Если usedA соответствует, добавляем usedB
      } else if (doc.userB.toString() === session.userId.toString()) {
        otherIds.push(doc.userA.toString()); // Иначе используем usedA
      }
    }
    console.log(12313131,otherIds)
    const friendsProfs = await searchUsersByUsernameScrollArray<UserProfileData[]>({
      friendsList: otherIds,
      searchString: searchValue,
      currentUserId: session.userId,
      lastPostId,
      selectedFields: ['avatar', 'username', '_id', 'banner', 'aboutMe'],
      limit,
    });
    return { ok: true, data: friendsProfs, message: 'Профили друзей получены.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};
