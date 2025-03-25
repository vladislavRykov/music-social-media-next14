'use server';

import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { AccessType } from '@/types/common';
import { PlaylistData } from '@/types/playlistTypes';
import { cache } from 'react';

export const getPlaylistById = async <T>(playlistId: string, populate?: string[]) => {
  await mongooseConnect();
  const query = Models.Playlist.findById(playlistId);
  if (populate) {
    query.populate(populate);
  }
  const playlist = await query.lean<T>().exec();
  return playlist;
};
export const addItemsToPlaylist = async (playlistId: string, items: string[]) => {
  await mongooseConnect();
  const playlist = await Models.Playlist.findOneAndUpdate(
    { _id: playlistId }, // Условие поиска
    { $addToSet: { items: { $each: items } } }, // Обновление
    { new: true }, // Возвращает обновленный документ
  );
  return playlist;
};
export const removeItemsToPlaylist = async (playlistId: string, items: string[]) => {
  await mongooseConnect();
  const playlist = await Models.Playlist.findOneAndUpdate(
    { _id: playlistId },
    { $pullAll: { items: items } },
    { new: true },
  );
  return playlist;
};
export const setNewPlaylistOrder = async (playlistId: string, items: string[]) => {
  await mongooseConnect();
  const result = await Models.Playlist.findOneAndUpdate(
    { _id: playlistId }, // Находим документ по id
    { $set: { items: items } }, // Обновляем поле musicIds с массивом id в нужном порядке
    { returnDocument: 'after' }, // Возвращает обновленный документ
  );
  console.log('то что надо', result);
  return result;
};
export const getAllUserPlaylists = async <T>(
  userId: string,
  populate?: { path: string; select?: string }[],
) => {
  await mongooseConnect();
  const query = Models.Playlist.find({ userId });
  if (populate) {
    query.populate(populate);
  }
  const playlists = await query.lean<T>().exec();

  return playlists;
};
export const getPlaylistsByUserName = async <T>(
  username: string,
  populate?: { path: string; select?: string }[],
) => {
  await mongooseConnect();
  const user = await Models.User.findOne({ username: username });
  const query = Models.Playlist.find({ userId: user._id });
  if (populate) {
    query.populate(populate);
  }
  const playlists = await query.lean<T>().exec();

  return playlists;
};
export const getPlaylistByType = async <T>({
  userId,
  type
}: {
  type: string,
  userId: string;
}) => {
  await mongooseConnect();
  const playlist = await Models.Playlist.findOne({  type, userId }).lean<T>();
  return playlist;
};
export const getUserLikesAndDislikes = async ({
  userId,
}: {
  userId: string;
}) => {
  await mongooseConnect();
  const favPlaylist = await Models.Playlist.findOne({  type:'favorites', userId }).lean<PlaylistData>();
  const disPlaylist = await Models.Playlist.findOne({  type:'disliked', userId }).lean<PlaylistData>();

  return {likes: favPlaylist?.items || null,dislikes: disPlaylist?.items|| null}

};
export const getUserPlaylistByTitle = async ({
  title,
  userId,
}: {
  title: string;
  userId: string;
}) => {
  await mongooseConnect();
  const playlist = await Models.Playlist.findOne({ title, userId });
  return playlist;
};
type createNewPlaylistParams = {
  userId: string;
  title: string;
  description: string;
  items: string[];
  access_type: AccessType;
  type?: string;
  hidden?: boolean;
  playlistImg?: string;
};

export const createPlaylist = async ({
  userId,
  title,
  description,
  access_type,
  items,
  type,
  hidden,
  playlistImg,
}: createNewPlaylistParams) => {
  await mongooseConnect();
  const playlist = await Models.Playlist.create({
    userId,
    title,
    description,
    access_type,
    items,
    type,
    hidden,
    playlistImg
  });
  return playlist;
};
export const deletePlaylist = async (playlistId: string) => {
  await mongooseConnect();
  const playlist = await Models.Playlist.findByIdAndDelete(playlistId);
  return playlist;
};
export const updatePlaylist = async (
  playlistId: string,
  newData: { title: string; description: string; access_type: AccessType },
) => {
  await mongooseConnect();
  const playlist = await Models.Playlist.findByIdAndUpdate(playlistId, newData, { new: true });
  return playlist;
};
export const setNewPlaylistImg = async (
  playlistId: string,
  newPlaylistImg: string,
) => {
  await mongooseConnect();
  const playlist = await Models.Playlist.findById(playlistId);
  if (!playlist) {
    return { ok: false,data: null, message: 'Плейлист не найден.' };
  }
  const oldAva: string | undefined = playlist.playlistImg
  playlist.playlistImg = newPlaylistImg;
  await playlist.save();
    return { ok: true,data: oldAva, message: 'Успешно.' };
};
export const deletePlaylistImg = async (
  playlistId: string,
) => {
  await mongooseConnect();
  const updatedPlaylist = await Models.Playlist.findByIdAndUpdate(playlistId, { $unset: { playlistImg: 1 } }, { new: false }).lean<PlaylistData>()
 return updatedPlaylist;
};




