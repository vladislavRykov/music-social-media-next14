'use server';
import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { ReactionT, TargetTypes } from '@/types/likeAndDislikes';

export const updateReaction = async ({
  userId,
  targetId,
  reactionType,
}: {
  userId: string;
  targetId: string;
  reactionType: string;
}) => {
  await mongooseConnect();
  const updatedReaction = await Models.Reaction.findOneAndUpdate(
    { userId, targetId },
    { $set: { reactionType: reactionType } }, // Обновление поля
    { new: true },
  ).lean<ReactionT>(); // Возвращает обновленный документ);

  return updatedReaction;
};
export const createReaction = async ({ userId, targetId, targetType, reactionType }: ReactionT) => {
  await mongooseConnect();

  const createdReaction = await Models.Reaction.create({
    userId,
    targetId,
    targetType,
    reactionType,
  });
  return createdReaction;
};
export const deleteReaction = async ({
  userId,
  targetId,
}: {
  userId: string;
  targetId: string;
}) => {
  await mongooseConnect();

  const deletedReaction = await Models.Reaction.findOneAndDelete({
    userId,
    targetId,
  }).lean<ReactionT>();
  return deletedReaction;
};
type Fields = {
  dislikes?: number;
  likes?: number;
};
export async function updateReactionCounts({
  targetId,
  targetType,
  fields,
}: {
  targetId: string;
  targetType: TargetTypes;
  fields: Fields;
}) {
  const Model = Models[targetType];
  if (!Model) throw new Error(`Unknown targetType: ${targetType}`);

  await Model.findByIdAndUpdate(targetId, { $inc: fields });
}
