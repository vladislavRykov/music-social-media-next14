'use server';
import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { LikeAndDislike, LikeOrDislike } from '@/types/likeAndDislikes';
import { Genre, MusicData } from '@/types/types';
import { ObjectId } from 'mongodb';

export const getAllUserLikeAndDislike = async ({
  userId,
  populate,
}: {
  userId: string;
  populate?: string[];
}) => {
  await mongooseConnect();
  const query = Models.LikesAndDislikes.find({
    userId,
  });
  if (populate) {
    query.populate(populate);
  }
  const likesAndDis = await query.lean<LikeAndDislike[]>().exec();
  return likesAndDis;
};
export const getFavItemsByUserId = async <T>({
  userId,
  populate,
}: {
  userId: string;
  populate?: string[];
}) => {
  await mongooseConnect();
  const query = Models.LikesAndDislikes.find({
    userId,
    type: 'like',
  });

  console.log('neneneenenne1231232131  erew');
  if (populate) {
    query.populate(populate);
  }
  console.log('12312neneneenenne1231232131  erew');
  const likes = await query.lean<T>().exec();
  console.log(999, likes);
  return likes;
};

export const getLikeOrDislike = async ({ userId, songId }: { userId: string; songId: string }) => {
  await mongooseConnect();
  const likesAndDis = await Models.LikesAndDislikes.findOne({
    userId,
    songId,
  }).lean<LikeAndDislike>();
  return likesAndDis;
};
export const setLikeOrDislike = async ({
  userId,
  songId,
  type,
}: {
  userId: string;
  songId: string;
  type: LikeOrDislike;
}) => {
  await mongooseConnect();
  const likesAndDis = await Models.LikesAndDislikes.findOneAndUpdate(
    { userId, songId },
    { $set: { type: type } }, // Обновление поля
    { new: true },
  ).lean<LikeAndDislike>(); // Возвращает обновленный документ);

  return likesAndDis;
};
export const createLikeOrDislike = async ({
  userId,
  songId,
  type,
}: {
  userId: string;
  songId: string;
  type: LikeOrDislike;
}) => {
  await mongooseConnect();

  const newLikesAndDis = await Models.LikesAndDislikes.create({
    userId,
    songId,
    type,
  });
  return newLikesAndDis;
};
export const deleteLikeOrDislike = async ({
  userId,
  songId,
}: {
  userId: string;
  songId: string;
}) => {
  await mongooseConnect();

  const newLikesAndDis = await Models.LikesAndDislikes.findOneAndDelete({ userId, songId });
  return newLikesAndDis;
};
