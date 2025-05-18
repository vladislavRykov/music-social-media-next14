'use server';
import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { RelationMongooseT, RelationStatus } from '@/types/relationT';

export const createRelation = async ({
  currentUserId,
  otherUserId,
  status,
}: {
  currentUserId: string;
  otherUserId: string;
  status: RelationStatus;
}) => {
  await mongooseConnect();
  const relation: RelationMongooseT = await Models.Relationship.create({
    userA: currentUserId,
    userB: otherUserId,
    status,
  });

  return relation;
};
export const updateRelationStatus = async ({
  currentUserId,
  otherUserId,
  status,
}: {
  currentUserId: string;
  otherUserId: string;
  status: RelationStatus;
}) => {
  await mongooseConnect();
  const oldRelation = await Models.Relationship.findOneAndUpdate(
    {
      $or: [
        { userA: currentUserId, userB: otherUserId },
        { userA: otherUserId, userB: currentUserId },
      ],
    },
    { status },
    { new: false },
  ).lean<RelationMongooseT>();
  return oldRelation;
};
export const getUsersRelation = async ({
  currentUserId,
  otherUserId,
}: {
  currentUserId: string;
  otherUserId: string;
}) => {
  await mongooseConnect();
  const realtion = await Models.Relationship.findOne({
    $or: [
      { userA: currentUserId, userB: otherUserId },
      { userA: otherUserId, userB: currentUserId },
    ],
  }).lean<RelationMongooseT>();
  return realtion;
};
export const isUsersHaveRelation = async ({
  currentUserId,
  otherUserId,
}: {
  currentUserId: string;
  otherUserId: string;
}) => {
  await mongooseConnect();
  const realtion = await Models.Relationship.exists({
    $or: [
      { userA: currentUserId, userB: otherUserId },
      { userA: otherUserId, userB: currentUserId },
    ],
  });
  return realtion;
};
export const isUsersFriends = async ({
  currentUserId,
  otherUserId,
}: {
  currentUserId: string;
  otherUserId: string;
}) => {
  await mongooseConnect();
  const realtion = await Models.Relationship.exists({
    status: RelationStatus.Friends,
    $or: [
      { userA: currentUserId, userB: otherUserId },
      { userA: otherUserId, userB: currentUserId },
    ],
  });
  return realtion;
};
export const isUserBlocked = async ({
  currentUserId,
  otherUserId, //который который мог заблочить текущего
}: {
  currentUserId: string;
  otherUserId: string;
}) => {
  await mongooseConnect();
  const realtion = await Models.Relationship.exists({
    status: RelationStatus.Blocked,
    userA: otherUserId,
    userB: currentUserId,
  });
  return realtion;
};
export const updateRelationUserOrder = async ({
  userA,
  userB,
}: {
  userA: string;
  userB: string;
}) => {
  await mongooseConnect();
  const oldRelation = await Models.Relationship.findOneAndUpdate(
    {
      $or: [
        { userA: userA, userB: userB },
        { userA: userB, userB: userA },
      ],
    },
    { userA, userB },
    { new: false },
  ).lean<RelationMongooseT>();
  return oldRelation;
};
