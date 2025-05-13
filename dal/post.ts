'use server';

import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { AccessType } from '@/types/common';
import { PlaylistData } from '@/types/playlistTypes';
import { CreatePostTypes, EditPostType } from '@/types/postTypes';
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


export const getPostsByUserName = async <T>(
  {username,
  lastPostId, limit = 10,sort=1}:{username: string,lastPostId:string|null,limit?:number,sort: 1|-1},
  populate?: { path: string; select?: string }[],
) => {
  await mongooseConnect();
  const user = await Models.User.findOne({ username: username });
  const idSortFilter = sort===-1 ? {_id: { $lt: lastPostId }}:{ _id: { $gt: lastPostId } }
  const filters = lastPostId ? {...idSortFilter, author: user._id } : { author: user._id }
  const query = Models.Post.find(filters).sort({ createdAt: sort }) // сортируем по убыванию _id
                          .limit(limit);
                  
  if (populate) {
    query.populate(populate);
  }
  const posts = await query.lean<T>().exec();
  return posts;
};
export const getPostById = async <T>(
  postId: string,
  populate?: { path: string; select?: string }[],
) => {
  await mongooseConnect();
  const query = Models.Post.findById(postId);
                  
  if (populate) {
    query.populate(populate);
  }
  const post = await query.lean<T>().exec();
  return post;
};

export const editPostById = async <T>(
  postId: string,
  newPostData: EditPostType,
  
) => {
  await mongooseConnect();
  const oldPost = await Models.Post.findByIdAndUpdate(postId,newPostData,{new:false}).lean<T>().exec();;
                  
  return oldPost;
};
export const deletePostById = async <T>(
  postId: string,
  
) => {
  await mongooseConnect();
  const deletePost = await Models.Post.findByIdAndDelete(postId).lean<T>().exec();;
                  
  return deletePost;
};