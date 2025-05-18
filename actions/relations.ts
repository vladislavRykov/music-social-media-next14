'use server';
import {
  createRelation,
  getUsersRelation,
  isUserBlocked,
  updateRelationStatus,
  updateRelationUserOrder,
} from '@/dal/relation';
import { changeFriendRequestStatus, getUserProfByUserName } from '@/dal/user';
import { verifySession } from '@/lib/sessions';
import { Models } from '@/models/models';
import { RelationStatus } from '@/types/relationT';

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
