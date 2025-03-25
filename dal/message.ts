'use server';

import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { ChatMongooseT } from '@/types/chatTypes';
import { AudioMessageCreateFields, MessageCreateFields, MessageMongoose, MessageTypes } from '@/types/messageT';



export const createMessage = async (data:MessageCreateFields) => {
  await mongooseConnect();
  const message = await Models.Message.create(
    data
  );

  return message._doc;
};
export const createAudioMessage = async (data:AudioMessageCreateFields) => {
  await mongooseConnect();
  const message = await Models.Message.create({
    type: MessageTypes.Voice,
    ...data}
  );

  return message._doc;
};
export const findMessagesByChatId = async <T>(chatId: string, populate?: { path: string; select?: string }[]) => {
  await mongooseConnect();

  const query =  Models.Message.find({
    chat: chatId,
  });

  if (populate) {
      query.populate(populate);
    }
    const messages = await query.lean<T>().exec();
    return messages;

};
export const deleteMessageById = async (messageId: string) => {
  await mongooseConnect();

  const deletedMessage =  await Models.Message.findByIdAndDelete(
    messageId
  ).lean<MessageMongoose>();

  return deletedMessage;

};

  
  
