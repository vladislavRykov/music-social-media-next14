'use server';

import {
  createPostMongoose,
  deletePostById,
  editPostById,
  findAllUserPosts,
  getPostById,
  getPostsByUserName,
} from '@/dal/post';
import { verifySession } from '@/lib/sessions';
import { CreatePostTypes, EditPostType, MongoosePost } from '@/types/postTypes';

export const createNewPost = async (postData: Omit<CreatePostTypes, 'author'>) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const createdPost = await createPostMongoose({ ...postData, author: session.userId });
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
    return { ok: true, data: posts, message: 'Посты получены.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};
export const findAllPostsByUsername = async ({
  username,
  lastPostId,
  sortType,
  limit,
}: {
  username: string;
  lastPostId: string | null;
  sortType: string;
  limit: number;
}) => {
  try {
    const sort = sortType === 'DESC' ? -1 : 1;
    const posts = await getPostsByUserName<MongoosePost[]>({ username, lastPostId, sort, limit });
    return { ok: true, data: posts, message: 'Посты по имени пользователя получены.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};
export const getPostsByIdA = async (postId: string) => {
  try {
    const post = await getPostById<MongoosePost>(postId);
    return { ok: true, data: post, message: 'Пост получен.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};
export const editPostByIdA = async (postId: string, newPostData: Omit<EditPostType, 'author'>) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }

    const post = await getPostById<MongoosePost>(postId);
    if (!post) return { ok: false, data: null, message: 'Пост не найден' };
    if (post.author.toString() !== session.userId.toString())
      return { ok: false, data: null, message: 'У вас нет прав на это действие' };
    const oldPost = await editPostById<MongoosePost>(postId, {...newPostData,author: session.userId});
    return { ok: true, data: oldPost, message: 'Пост был изменен.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};
export const deletePostByIdA = async (postId: string) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }

    const post = await getPostById<MongoosePost>(postId);
    if (!post) return { ok: false, data: null, message: 'Пост не найден' };
    if (post.author.toString() !== session.userId.toString())
      return { ok: false, data: null, message: 'У вас нет прав на это действие' };

    const deletedPost = await deletePostById<MongoosePost>(postId);
    return { ok: true, data: deletedPost, message: 'Пост был удален.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};
