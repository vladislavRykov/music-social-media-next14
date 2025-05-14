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
  const relation = await Models.Relationship.create({
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
export const updateRelationUserOrder = async ({
  currentUserA,
  currentUserB,
}: {
  currentUserA: string;
  currentUserB: string;
}) => {
  await mongooseConnect();
  const oldRelation = await Models.Relationship.findOneAndUpdate(
    {
      $or: [
        { userA: currentUserA, userB: currentUserB },
        { userA: currentUserB, userB: currentUserA },
      ],
    },
    { userA: currentUserB, userB: currentUserA },
    { new: false },
  ).lean<RelationMongooseT>();
  return oldRelation;
};
