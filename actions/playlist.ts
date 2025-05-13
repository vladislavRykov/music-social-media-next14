'use server';

import { getArrayMusicByIdWithIsLiked, getMusicsByIds } from '@/dal/music';
import {
  addItemsToPlaylist,
  createPlaylist,
  deletePlaylist,
  getAllUserPlaylists,
  getPlaylistById,
  getPlaylistByType,
  getPlaylistsByUserName,
  getUserPlaylistByTitle,
  removeItemsToPlaylist,
  setNewPlaylistImg,
  setNewPlaylistOrder,
  updatePlaylist,
} from '@/dal/playlist';
import { verifySession } from '@/lib/sessions';
import { AccessType, Overwrite } from '@/types/common';
import { ItemsPlaylistData, PlaylistData, UserPlaylistData } from '@/types/playlistTypes';
import { MusicData, MusicDataWithReactionT } from '@/types/types';
import { cache } from 'react';

type createNewPlaylistParams = {
  title: string;
  description: string;
  items: string[];
  access_type: AccessType;
};

export const addItemsToPlaylistAction = async (playlistId: string, items: string[]) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }

    const playlistUpdated = await addItemsToPlaylist(playlistId, items);
    return { ok: true, message: 'Новый элемент добавлен в плейлист.' };
  } catch (error) {
    return { ok: false, message: 'Не удалось добавить элемент в плейлист.' };
  }
};
export const removeItemsToPlaylistAction = async (playlistId: string, items: string[]) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }
    const playlist = await getPlaylistById<PlaylistData>(playlistId);
    if (playlist?.userId.toString() !== session.userId)
      return { ok: false, message: 'У вас нет прав на это действие.' };
    const playlistUpdated = await removeItemsToPlaylist(playlistId, items);
    return { ok: true, message: 'Элемент был удален из плейлиста.' };
  } catch (error) {
    return { ok: false, message: 'Не удалось удалить элемент из плейлиста.' };
  }
};
export const setNewPlaylistOrderAction = async (playlistId: string, items: string[]) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }
    const playlist = await getPlaylistById<PlaylistData>(playlistId);
    if (playlist?.userId.toString() !== session.userId)
      return { ok: false, message: 'У вас нет прав на это действие.' };
    const playlistUpdated = await setNewPlaylistOrder(playlistId, items);
    return { ok: true, message: 'Порядок был изменен.' };
  } catch (error) {
    return { ok: false, message: 'Не изменить порядок.' };
  }
};

export const createNewPlaylist = async ({
  title,
  description,
  access_type,
  items,
}: createNewPlaylistParams) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }
    const data = await getUserPlaylistByTitle({ userId: session.userId, title });
    if (data) return { ok: false, message: 'Плейлист с таким названием уже существует.' };
    const playlist = await createPlaylist({
      // await createPlaylist({
      userId: session.userId,
      title,
      description,
      access_type,
      items,
    });
    // return { message: 'Плейлист создан.', data: playlist, ok: true };
    return { message: 'Плейлист создан.', data: playlist._doc, ok: true };
  } catch (error) {
    return { message: 'Не удалось создать плейлист.', ok: false };
  }
};
export const getAllUserPlaylist = async <T>(
  populate?: {
    path: string;
    select?: string;
  }[],
) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }

    const playlists = await getAllUserPlaylists<T>(session.userId, populate);
    return { ok: true, data: playlists, message: 'Плейлисты успешно получены' };
  } catch (error) {
    return { ok: false, message: 'Не удалось получить плейлисты' };
  }
};
export const getPlayerPlaylistsData = async (playlistId: string) => {
  try {
    const session = await verifySession();
    // if (!session) {
    //   return { ok: false, message: 'Вы не авторизированы' };
    // }
    // const items = getMusicsByIds({ musicIds: playlistItems })
    // const playlists = await getPlaylistById<Overwrite<PlaylistData, { items: MusicData[] }>>(
    //   playlistId,
    //   ['items'],
    // );
    const playlist = await getPlaylistById<PlaylistData>(playlistId);
    if (!playlist) return { ok: true, data: null, message: 'Плейлист не найден' };
    const musics = await getArrayMusicByIdWithIsLiked(playlist.items, session?.userId);

    const sortedMusics = playlist.items
      .map((id) => musics.find((m) => m._id.toString() === id.toString()))
      .filter((music) => !!music); // Удаляем undefined (если какие-то ID не найдены)

    const playlistWithMusics: Overwrite<PlaylistData, { items: MusicDataWithReactionT[] }> = {
      ...playlist,
      items: sortedMusics,
    };

    return { ok: true, data: playlistWithMusics, message: 'Плейлист успешно получен' };
  } catch (error) {
    return { ok: false, message: 'Не удалось получить плейлист' };
  }
};
export const getPlaylistsByUsernameAction = async <T>(
  username: string,
  populate?: {
    path: string;
    select?: string;
  }[],
) => {
  try {
    // const session = await verifySession();
    // if (!session) {
    //   return { ok: false, message: 'Вы не авторизированы' };
    // }

    const playlists = await getPlaylistsByUserName<T>(username, populate);
    return { ok: true, data: playlists, message: 'Плейлисты успешно получены' };
  } catch (error) {
    return { ok: false, message: 'Не удалось получить плейлисты' };
  }
};
export const deletePlaylistAction = async (playlistId: string) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }
    const playlistToDelete = await getPlaylistById<PlaylistData>(playlistId);
    console.log(playlistToDelete?.userId, session.userId);
    if (playlistToDelete?.userId.toString() !== session.userId)
      return { ok: false, message: 'У вас нет прав на это действие.' };
    const playlist = await deletePlaylist(playlistId);
    return { ok: true, message: 'Плейлист успешно удален.' };
  } catch (error) {
    return { ok: false, message: 'Не удалось удалить плейлист.' };
  }
};
export const updatePlaylistAction = async (
  playlistId: string,
  newData: { title: string; description: string; access_type: AccessType },
) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }
    const playlistToDelete = await getPlaylistById<PlaylistData>(playlistId);
    console.log(playlistToDelete?.userId, session.userId);
    if (playlistToDelete?.userId.toString() !== session.userId)
      return { ok: false, message: 'У вас нет прав на это действие.' };
    const playlist = await updatePlaylist(playlistId, newData);
    return { ok: true, message: 'Плейлист успешно обновлён.' };
  } catch (error) {
    return { ok: false, message: 'Не удалось обновить плейлист.' };
  }
};
export const addToFavPlaylist = async (items: string[]) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }

    const favPlaylist = await getPlaylistByType<PlaylistData>({
      userId: session.userId,
      type: 'favorites',
    });
    if (!favPlaylist) {
      const newFavPlaylist = await createPlaylist({
        userId: session.userId,
        title: 'Понравившаяся музыка',
        description:
          'В этот плейлист попадают треки, которым вы поставили отметку "Нравится". Изменить параметры плейлиста можно в настройках.',
        access_type: AccessType.Public,
        items,
        type: 'favorites',
      });
    } else {
      const playlistUpdated = await addItemsToPlaylist(favPlaylist.userId, items);
    }

    return { ok: true, message: 'Трек добавлен в понравившуюся музыку.' };
  } catch (error) {
    return { ok: false, message: 'Не удалось добавить трек в понравившуюся музыку.' };
  }
};
export const removeFromFavPlaylist = async (items: string[]) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }

    const disPlaylist = await getPlaylistByType<PlaylistData>({
      userId: session.userId,
      type: 'disliked',
    });
    if (!disPlaylist) {
      const newDislikedPlaylist = await createPlaylist({
        userId: session.userId,
        title: 'Непонравившаяся музыка',
        description:
          'В этот плейлист попадают треки, которым вы поставили отметку "Не нравится". Изменить параметры плейлиста можно в настройках.',
        access_type: AccessType.Private,
        items,
        type: 'disliked',
        hidden: true,
      });
    } else {
      const playlistUpdated = await removeItemsToPlaylist(disPlaylist.userId, items);
    }

    return { ok: true, message: 'Трек добавлен в понравившуюся музыку.' };
  } catch (error) {
    return { ok: false, message: 'Не удалось добавить трек в понравившуюся музыку.' };
  }
};
export const replacePlaylistImg = cache(async (playlistId: string, imgUrl: string) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }
    const res = await setNewPlaylistImg(playlistId, imgUrl);
    if (!res.ok) return { ok: false, message: res.message };
    return {
      ok: true,
      message: 'Изображение успешно загружена.',
      deletedPlaylistImgUrl: res.data || null,
    };
  } catch (error) {
    return { ok: false, message: 'Ошибка при загрузки изображение.' };
  }
});
