'use server';

import { getArrayEventAttendancesByIds } from '@/dal/eventAttendance';
import { getGenresByIdsArray } from '@/dal/genres';
import { getPlaylistByType } from '@/dal/playlist';
import { getUserLocation, getUserProfByUserName, setUserLocation } from '@/dal/user';
import { getSortedGenres } from '@/helpers/actions/genres';
import { verifySession } from '@/lib/sessions';
import { Overwrite } from '@/types/common';
import { PlaylistData } from '@/types/playlistTypes';
import { Genre, MusicData } from '@/types/types';
import { sortGenres } from '@/utils/ArrayFunctions';

export const getFavGenresByUsername = async (username: string) => {
  try {
    const user = await getUserProfByUserName(username);
    if (!user) return { ok: false, data: null, message: `Пользователь ${username} не найден` };
    const favPlaylist = await getPlaylistByType<
      Overwrite<PlaylistData, { items: { _id: string; genres: string[] }[] }>
    >({ type: 'favorites', userId: user._id }, [{ path: 'items', select: '_id genres' }]);
    if (!favPlaylist || favPlaylist.items.length === 0)
      return {
        ok: true,
        data: { genres: [] },
        message: `Пользователь ${username} пока не добавлял ничего в "понравившиеся"`,
      };
    const genreIds = favPlaylist.items.reduce<string[]>((acc, music) => {
      acc.push(...music.genres);
      return acc;
    }, []);
    const sortedGenres = await getSortedGenres(genreIds);
    const serializedSortedGenres:Genre[] = sortedGenres.map(genre=>({...genre,_id: genre._id.toString()}))
    return { ok: true, data: { genres: serializedSortedGenres }, message: 'Любимые жанры получены' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка' };
  }
};
