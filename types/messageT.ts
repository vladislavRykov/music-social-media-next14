import { UserProfileData } from "./types";

export enum MessageTypes{
  Text = 'text',
  Voice='voice'
}

export interface MessageMongoose{
      _id: string,
    author: string;
      text?: string;
      chat: string;
      unread: boolean;
      type: MessageTypes;

      voiceSrc?: string,
      attachments: string[]|null;
createdAt: Date;
updatedAt: Date;
}
export interface MessageCreateFields{
    author: string;
      text: string;
      chat: string;
      unread?: boolean;
      
      attachments?: string[]|null;
}
export interface AudioMessageCreateFields{

   voiceSrc: string,
    author: string;
    chat: string;
    unread?: boolean;
      
}

export interface ChatMessageT{
    isCurrentUserMessage: boolean;
    _id:string,
    text?: string;
    type: MessageTypes;

    voiceSrc?: string,
    chat: string;
    unread: boolean;
    attachments: string[] | null;
    author: UserProfileData;
createdAt: Date;
updatedAt: Date;
}