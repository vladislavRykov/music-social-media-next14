'use server';

import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { AccessType } from '@/types/common';
import { PlaylistData } from '@/types/playlistTypes';
import { CreatePostTypes } from '@/types/postTypes';
import { cache } from 'react';


export const createPostMongoose = async (postData:CreatePostTypes) => {
  await mongooseConnect();
  const createdPost = await Models.Post.create(postData);

  return createdPost;
};
export const findAllUserPosts = async (userId:string) => {
  await mongooseConnect();
  const usersPosts = await Models.Post.find({author: userId});

  return usersPosts;
};