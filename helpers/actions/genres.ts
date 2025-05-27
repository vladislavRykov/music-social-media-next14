'use server';

import { getArrayEventAttendancesByIds } from '@/dal/eventAttendance';
import { getGenresByIdsArray } from '@/dal/genres';
import { getPlaylistByType } from '@/dal/playlist';
import { getUserLocation, getUserProfByUserName, setUserLocation } from '@/dal/user';
import { verifySession } from '@/lib/sessions';
import { Overwrite } from '@/types/common';
import { PlaylistData } from '@/types/playlistTypes';
import { Genre, MusicData } from '@/types/types';
import { sortGenres } from '@/utils/ArrayFunctions';

export const getSortedGenres = async (genreIds: string[]) => {
  const sortedGenreIds = sortGenres(genreIds.map((id) => id.toString()));
  const unsortedGenres = await getGenresByIdsArray(sortedGenreIds);
  const sortedGenres = sortedGenreIds
    .map((id) => unsortedGenres.find((genre) => genre._id.toString() === id.toString()))
    .filter((genre) => !!genre); // Удаляем undefined (если какие-то ID не найдены)
  return sortedGenres;
};
