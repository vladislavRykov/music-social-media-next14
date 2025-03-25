'use server';
import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { Genre, MusicData } from '@/types/types';
import { ObjectId } from 'mongodb';

export const getMusicById = async (musicId: string) => {
  try {
    await mongooseConnect();
    const music = await Models.Music.findById(musicId);
    if (!music) {
      return null;
    }
    return music._doc;
  } catch (error) {
    return null;
  }
};
export const getAllMusic = async ({ genres, search }: { genres: string[]; search: string }) => {
  let query: any = {}; // Инициализируем пустой объект запроса

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { author: { $regex: search, $options: 'i' } },
    ];
  }

  if (genres.length > 0) {
    query.genres = { $all: genres };
  }
  try {
    await mongooseConnect();
    const musics = await Models.Music.find(query).lean<MusicData[]>();
    if (!musics) {
      return null;
    }

    return musics;
  } catch (error) {
    return null;
  }
};
export const getMusicsByIds = async ({ musicIds }: { musicIds: string[] }) => {
  try {
    await mongooseConnect();
    const musics = await Models.Music.find({ _id: { $in: musicIds } }).lean<MusicData[]>();
    if (!musics) {
      return null;
    }

    return musics;
  } catch (error) {
    return null;
  }
};

export const getAllGenres = async () => {
  try {
    await mongooseConnect();
    const genres = await Models.Genre.find().lean<Genre[]>();
    if (!genres) {
      return null;
    }

    return JSON.stringify(genres);
  } catch (error) {
    return null;
  }
};

type Fields= {
  dislikes?: number
  likes?:number
}

export const changeMusicLikeOrDislike =async(songId:string,{dislikes,likes}:Fields)=>{
  await mongooseConnect();
  const inc:any = {}
  if(dislikes) inc.dislikes = dislikes
  if(likes) inc.likes = likes
  await Models.Music.findOneAndUpdate(
    { _id:songId }, // Условия поиска
    { $inc: inc }, // Уменьшение поля score на 1
    { new: true } // Возвращает обновленный документ
  )
}
