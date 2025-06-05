import { Overwrite } from '@/types/common';
import { MessageMongoose } from './messageT';
import { Schema } from 'mongoose';
import { UserProfileData } from './types';
import { RelationMongooseT } from './relationT';

export interface ChatMongooseT {
  _id: string;
  members: string[];
  lastMessage: string | null;
  type: string;
  relation?: string;
  createdAt: Date;
  updatedAt: Date;
}
export type MessageWithAuthor = Overwrite<
  MessageMongoose,
  { author: { _id: string; username: string } }
>;

export interface ChatItemType
  extends Overwrite<
    ChatMongooseT,
    {
      members: { _id: string; username: string; avatar?: string; banner?: string }[];
      lastMessage: MessageWithAuthor | null;
      relation?: RelationMongooseT;
      chatName: string;
      chatImg: string | undefined;
    }
  > {}
export interface ChatItemDateStringType
  extends Overwrite<
    ChatMongooseT,
    {
      members: { _id: string; username: string; avatar?: string; banner?: string }[];
      lastMessage: Overwrite<MessageWithAuthor, { createdAt: string; updatedAt: string }> | null;
      relation?: Overwrite<RelationMongooseT, { createdAt: string; updatedAt: string }>;
      chatName: string;
      chatImg: string | undefined;
      createdAt: string;
      updatedAt: string;
    }
  > {}
