'use server';

import {
  createPostMongoose,
  deletePostById,
  editPostById,
  findAllUserPosts,
  getArrayPostByIdWithIsLiked,
  getPostById,
  getPostByIdWithIsLiked,
  getPostsByUserName,
  searchPostsByAuthors,
  searchPostsByUserName,
  searchPostsInArray,
} from '@/dal/post';
import { getLikedPostReaction } from '@/dal/reaction';
import { getUserFriends } from '@/dal/relation';
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
    const session = await verifySession();
    const sort = sortType === 'DESC' ? -1 : 1;
    const posts = await getPostsByUserName<MongoosePost[]>({ username, lastPostId, sort, limit });
    const postsIdsArray = posts.map((post) => post._id);
    const postsWithLike = await getArrayPostByIdWithIsLiked(postsIdsArray, session?.userId);
    const sortedPosts = postsIdsArray
      .map((id) => postsWithLike.find((p) => p._id.toString() === id.toString()))
      .filter((post) => !!post); // Удаляем undefined (если какие-то ID не найдены)
    return { ok: true, data: sortedPosts, message: 'Посты по имени пользователя получены.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};
export const searchPostsByUsernameA = async ({
  searchString,
  username,
  lastPostId,
  sortType,
  limit,
}: {
  searchString: string,
  username: string;
  lastPostId: string | null;
  sortType: string;
  limit: number;
}) => {
  try {
    const session = await verifySession();
    const sort = sortType === 'DESC' ? -1 : 1;
    const posts = await searchPostsByUserName<MongoosePost[]>({ username, lastPostId, sort, limit,searchString });
    const postsIdsArray = posts.map((post) => post._id);
    const postsWithLike = await getArrayPostByIdWithIsLiked(postsIdsArray, session?.userId);
    const sortedPosts = postsIdsArray
      .map((id) => postsWithLike.find((p) => p._id.toString() === id.toString()))
      .filter((post) => !!post); // Удаляем undefined (если какие-то ID не найдены)
    return { ok: true, data: sortedPosts, message: 'Посты по имени пользователя получены.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};
export const searchPostsFriendsA = async ({
  searchString,
  lastPostId,
  sortType,
  limit,
}: {
  searchString: string,
  lastPostId: string | null;
  sortType: string;
  limit: number;
}) => {
  try {
    const session = await verifySession();
     if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const sort = sortType === 'DESC' ? -1 : 1;
    const friendRelations = await getUserFriends({currentUserId: session.userId})
      const friendIds: string[] = [];

    for (let doc of friendRelations) {
      if (doc.userA.toString() ===  session.userId.toString()) {
        friendIds.push(doc.userB.toString()); // Если usedA соответствует, добавляем usedB
      } else if (doc.userB.toString() ===  session.userId.toString()) {
        friendIds.push(doc.userA.toString()); // Иначе используем usedA
      }
    }
    const posts = await searchPostsByAuthors<MongoosePost[]>({ authorsIdsArray: friendIds, lastPostId, sort, limit,searchString });
    const postsIdsArray = posts.map((post) => post._id);
    const postsWithLike = await getArrayPostByIdWithIsLiked(postsIdsArray, session?.userId);
    const sortedPosts = postsIdsArray
      .map((id) => postsWithLike.find((p) => p._id.toString() === id.toString()))
      .filter((post) => !!post); // Удаляем undefined (если какие-то ID не найдены)
    return { ok: true, data: sortedPosts, message: 'Посты по имени пользователя получены.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};
export const searchPostsLikedA = async ({
  searchString,
  lastPostId,
  sortType,
  limit,
}: {
  searchString: string,
  lastPostId: string | null;
  sortType: string;
  limit: number;
}) => {
  try {
    const session = await verifySession();
      if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const reactions = await getLikedPostReaction({userId: session.userId})
    const likedPostIds = reactions.map(post=>post.targetId.toString())
    console.log(likedPostIds)
    const sort = sortType === 'DESC' ? -1 : 1;
    const posts = await searchPostsInArray<MongoosePost[]>({ postIdsArray:likedPostIds , lastPostId, sort, limit,searchString });
    console.log(posts)
    const postsIdsArray = posts.map((post) => post._id);
    const postsWithLike = await getArrayPostByIdWithIsLiked(postsIdsArray, session?.userId);
    const sortedPosts = postsIdsArray
      .map((id) => postsWithLike.find((p) => p._id.toString() === id.toString()))
      .filter((post) => !!post); // Удаляем undefined (если какие-то ID не найдены)
    return { ok: true, data: sortedPosts, message: 'Посты по имени пользователя получены.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};
export const getPostsByIdA = async (postId: string) => {
  try {
    const session = await verifySession();
    const post = await getPostByIdWithIsLiked(postId, session?.userId);
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
    const oldPost = await editPostById<MongoosePost>(postId, {
      ...newPostData,
      author: session.userId,
    });
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
