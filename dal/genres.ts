'use server';
import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { Genre } from '@/types/types';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

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
export const getGenresByIdsArray = async (genreIds: string[]) => {
  await mongooseConnect();
  const genres = await Models.Genre.find({ _id: { $in: genreIds } }).lean<Genre[]>();

  return genres;
};
