'use server';

import { createPostMongoose, findAllUserPosts } from '@/dal/post';
import { verifySession } from '@/lib/sessions';
import { CreatePostTypes } from '@/types/postTypes';



export const createNewPost = async (postData:Omit<CreatePostTypes, 'author'>) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const createdPost = await createPostMongoose({...postData,author: session.userId});
    return { ok: true, data: createdPost, message: 'Новый пост создан.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};

export const findAllCurrentUserPosts = async () => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const posts = await findAllUserPosts(session.userId);
    return { ok: true, data: posts, message: 'Новый элемент добавлен в плейлист.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};
