'use server';
import {
  createReaction,
  deleteReaction,
  updateReaction,
  updateReactionCounts,
} from '@/dal/reaction';
import { verifySession } from '@/lib/sessions';
import { Models } from '@/models/models';
import { CreateReactionT, LikeOrDislike, ReactionT } from '@/types/likeAndDislikes';
import { Model } from 'mongoose';

export const setReactionToTargetA = async ({
  targetId,
  targetType,
  reactionType,
}: CreateReactionT) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const userId = session.userId
    const isReactionExists = await Models.Reaction.exists({
      userId,
      targetId,
      targetType,
    });
    if (isReactionExists && reactionType) {
      const updatedReaction = await updateReaction({ userId, targetId, reactionType });
      const fields =
        reactionType === LikeOrDislike.Like
          ? { likes: 1, dislikes: -1 }
          : { likes: -1, dislikes: 1 };
      await updateReactionCounts({ targetId, targetType, fields });
      if (!updatedReaction)
        return { ok: false, data: null, message: 'Не удалось обновить реакцию.' };
      return { ok: true, data: updatedReaction, message: 'Реакция была обновлена.' };
    } else if (isReactionExists && !reactionType) {
      const deletedReaction = await deleteReaction({ userId, targetId });
      if (!deletedReaction)
        return { ok: false, data: null, message: 'Не удалось обновить реакцию.' };
      const fields =
        deletedReaction.reactionType === LikeOrDislike.Like ? { likes: -1 } : { dislikes: -1 };
      await updateReactionCounts({ targetId, targetType, fields });
      return { ok: true, data: deletedReaction, message: 'Реакция была удалена.' };
    } else if (reactionType) {
      const createdReaction = await createReaction({ userId, targetId, targetType, reactionType });
      const fields = reactionType === LikeOrDislike.Like ? { likes: 1 } : { dislikes: 1 };
      await updateReactionCounts({ targetId, targetType, fields });
      return { ok: true, data: createdReaction, message: 'Реакция была создана.' };
    } else {
      return {
        ok: false,
        data: null,
        message: 'Реакции не существует, не возможно убрать реакцию.',
      };
    }
  } catch (error) {
    console.log(323, error);
    return { ok: false, data: null, message: 'Не удалось провести это действие.' };
  }
};
