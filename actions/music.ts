'use server';

import { getArrayMusicByIdWithIsLiked, getMusicById, getMusicByIdWithIsLiked } from '@/dal/music';
import { verifySession } from '@/lib/sessions';
import {ObjectId} from 'mongodb'

export const getMusicByIdA = async (musicId: string) => {
  try {
    const session = await verifySession();
    // const music = await getMusicById(musicId);
    // if (!music) return { ok: false, data: null, message: 'Не удалось найти музыку.' };
    const music = await getMusicByIdWithIsLiked(musicId,session?.userId);
  
    if (!music) return { ok: false, data: null, message: 'Не удалось найти музыку.' };

    return { ok: false, data: music, message: 'Удалось получить музыку.' };
  } catch (error) {
    return { ok: false, data: null, message: 'Не удалось провести это действие.' };
  }
};
export const getArrayMusicByIdA = async (musicIdArray: string[]) => {
  try {
    const session = await verifySession();
    // const music = await getMusicById(musicId);
    // if (!music) return { ok: false, data: null, message: 'Не удалось найти музыку.' };
    const musicObjectidsArray = musicIdArray.map(id=>new ObjectId(id))
    const musics = await getArrayMusicByIdWithIsLiked(musicObjectidsArray,session?.userId);
  
    if (!musics) return { ok: false, data: null, message: 'Не удалось найти музыку.' };

    return { ok: true, data: musics, message: 'Удалось получить музыку.' };
  } catch (error) {
    return { ok: false, data: null, message: 'Не удалось провести это действие.' };
  }
};
