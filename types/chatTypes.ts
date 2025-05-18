import { Overwrite } from '@/types/common';
import { MessageMongoose } from './messageT';
import { Schema } from 'mongoose';

export interface ChatMongooseT {
    _id:string,
    members: string[],
    lastMessage: string|null,
    type: string,
    relation?: string,
}
export type MessageWithAuthor = Overwrite<MessageMongoose,{author: {_id: Schema.Types.ObjectId,username:string}}>
