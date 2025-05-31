'use server';

import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { ChatMongooseT } from '@/types/chatTypes';
import {
  CreateEventAttendanceT,
  EventAttendanceMongooseT,
  EventAttendanceStatus,
} from '@/types/eventAttendace';

export const getEventAttendance = async (currentUserId: string, eventId: string) => {
  await mongooseConnect();
  const eventAttendance = await Models.EventAttendance.findOne({
    user: currentUserId,
    eventId,
  }).lean<EventAttendanceMongooseT>();

  return eventAttendance;
};
export const getAllUserEventAttendances = async (userId: string) => {
  await mongooseConnect();
  const eventAttendances = await Models.EventAttendance.find({
    user: userId,
  }).lean<EventAttendanceMongooseT[]>();

  return eventAttendances;
};
export const getArrayEventAttendancesByIds = async (currentUserId: string, eventIds: string[]) => {
  await mongooseConnect();
  const eventAttendances = await Models.EventAttendance.find({
    user: currentUserId,
    eventId: { $in: eventIds },
  }).lean<EventAttendanceMongooseT[]>();

  return eventAttendances;
};
export const getEAWithUserArrayByEventId = async <T>(eventId: string, userIds: string[],  populate?: { path: string; select?: string }[],) => {
  await mongooseConnect();
  const query =  Models.EventAttendance.find({
    eventId: eventId,
    user: { $in: userIds },
  })
  if(populate){
    query.populate(populate)
  }
  const eventAttendances = await query.lean<T>().exec();

  return eventAttendances;
};
export const createNewEventAttendance = async (data: CreateEventAttendanceT) => {
  await mongooseConnect();
  const message = await Models.EventAttendance.create(data);

  return message._doc;
};
export const updateEventAttendanceStatus = async (
  currentUserId: string,
  eventId: string,
  newStatus: EventAttendanceStatus,
) => {
  await mongooseConnect();
  const oldEventAttendance = await Models.EventAttendance.findOneAndUpdate(
    { user: currentUserId, eventId },
    { status: newStatus },
  ).lean<EventAttendanceMongooseT>();

  return oldEventAttendance;
};
export const deleteEventAttendance = async (currentUserId: string, eventId: string) => {
  await mongooseConnect();
  const deletedEventAttendance = await Models.EventAttendance.findOneAndDelete({
    user: currentUserId,
    eventId,
  }).lean<EventAttendanceMongooseT>();

  return deletedEventAttendance;
};
