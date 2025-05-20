'use server';

import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { AccessType } from '@/types/common';
import { PlaylistData } from '@/types/playlistTypes';
import { CreatePostTypes, EditPostType, MongoosePostReactionT } from '@/types/postTypes';
import { cache } from 'react';

import { ObjectId } from 'mongodb';

export const createPostMongoose = async (postData: CreatePostTypes) => {
  await mongooseConnect();
  const createdPost = await Models.Post.create(postData);

  return createdPost;
};
export const findAllUserPosts = async (userId: string) => {
  await mongooseConnect();
  const usersPosts = await Models.Post.find({ author: userId });

  return usersPosts;
};

export const getArrayPostByIdWithIsLiked = async (
  postIds: string[] | ObjectId[],
  currentUserId?: string,
) => {
  await mongooseConnect();
  console.log(33333, postIds);
  // const music = await Models.Music.findById(musicId).lean<MusicData>();
  const posts: MongoosePostReactionT[] = await Models.Post.aggregate([
    // Начало агрегационного запроса для модели Post
    // Этап 1: Выборка всех постов (можно дополнительно наложить фильтры)
    { $match: { _id: { $in: postIds } } }, // Здесь пока пустое условие, значит будут выбраны все посты

    // Этап 2: Соединение коллекции Post с Reactions (для проверки реакций конкретного пользователя)
    {
      $lookup: {
        // Оператор агрегации для присоединения внешних данных
        from: 'reactions', // Внешняя коллекция, с которой хотим присоединиться
        let: { postId: '$_id' }, // Переменная, хранящая ID текущего обрабатываемого поста
        pipeline: [
          // Внутренний трубопровод обработки данных из внешней коллекции
          {
            $match: {
              // Отбор необходимых реакций
              $expr: {
                // Выражение для фильтрации
                $and: [
                  // Логическое AND для комбинации условий
                  { $eq: ['$targetId', '$$postId'] }, // Проверка совпадения targetId (ID поста) с текущим постом
                  { $eq: ['$userId', new ObjectId(currentUserId)] }, // Проверка совпадения userId с указанным пользователем
                  { $eq: ['$targetType', 'Post'] }, // Проверка типа реакции ("Post")
                ],
              },
            },
          },
          {
            $project: {
              // Проекция, показывающая, какие поля вернуть
              _id: 0, // Скрываем стандартное поле _id
              reactionType: 1, // Показываем только поле reactionType
            },
          },
        ],
        as: 'userReactions', // Результирующий массив записывается в поле userReactions
      },
    },

    // Этап 3: Создание дополнительного поля reactionStatus
    {
      $addFields: {
        // Оператор для добавления новых полей
        reactionStatus: {
          // Новое поле reactionStatus
          $switch: {
            // Логический переключатель для определения статуса реакции
            branches: [
              // Ветви условий
              { case: { $in: ['like', '$userReactions.reactionType'] }, then: 'liked' }, // Если есть "like", ставим "liked"
              { case: { $in: ['dislike', '$userReactions.reactionType'] }, then: 'disliked' }, // Если есть "dislike", ставим "disliked"
            ],
            default: 'none', // По умолчанию, если реакции нет, ставим "none"
          },
        },
      },
    },

    // Этап 4: Удаление промежуточного поля userReactions
    {
      $unset: ['userReactions'], // Убираем промежуточное поле userReactions
    },
  ]);

  return posts;
};
export const getPostsByUserName = async <T>(
  {
    username,
    lastPostId,
    limit = 10,
    sort = 1,
  }: { username: string; lastPostId: string | null; limit?: number; sort: 1 | -1 },
  populate?: { path: string; select?: string }[],
) => {
  await mongooseConnect();
  const user = await Models.User.findOne({ username: username });
  const idSortFilter = sort === -1 ? { _id: { $lt: lastPostId } } : { _id: { $gt: lastPostId } };
  const filters = lastPostId ? { ...idSortFilter, author: user._id } : { author: user._id };
  const query = Models.Post.find(filters)
    .sort({ createdAt: sort }) // сортируем по убыванию _id
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
export const getPostByIdWithIsLiked = async (postId: string, currentUserId?: string) => {
  await mongooseConnect();
  // const music = await Models.Music.findById(musicId).lean<MusicData>();
  const post: MongoosePostReactionT[] = await Models.Post.aggregate([
    // Начало агрегационного запроса для модели Post
    // Этап 1: Выборка всех постов (можно дополнительно наложить фильтры)
    { $match: { _id: new ObjectId(postId) } }, // Здесь пока пустое условие, значит будут выбраны все посты

    // Этап 2: Соединение коллекции Post с Reactions (для проверки реакций конкретного пользователя)
    {
      $lookup: {
        // Оператор агрегации для присоединения внешних данных
        from: 'reactions', // Внешняя коллекция, с которой хотим присоединиться
        let: { postId: '$_id' }, // Переменная, хранящая ID текущего обрабатываемого поста
        pipeline: [
          // Внутренний трубопровод обработки данных из внешней коллекции
          {
            $match: {
              // Отбор необходимых реакций
              $expr: {
                // Выражение для фильтрации
                $and: [
                  // Логическое AND для комбинации условий
                  { $eq: ['$targetId', '$$postId'] }, // Проверка совпадения targetId (ID поста) с текущим постом
                  { $eq: ['$userId', new ObjectId(currentUserId)] }, // Проверка совпадения userId с указанным пользователем
                  { $eq: ['$targetType', 'Post'] }, // Проверка типа реакции ("Post")
                ],
              },
            },
          },
          {
            $project: {
              // Проекция, показывающая, какие поля вернуть
              _id: 0, // Скрываем стандартное поле _id
              reactionType: 1, // Показываем только поле reactionType
            },
          },
        ],
        as: 'userReactions', // Результирующий массив записывается в поле userReactions
      },
    },

    // Этап 3: Создание дополнительного поля reactionStatus
    {
      $addFields: {
        // Оператор для добавления новых полей
        reactionStatus: {
          // Новое поле reactionStatus
          $switch: {
            // Логический переключатель для определения статуса реакции
            branches: [
              // Ветви условий
              { case: { $in: ['like', '$userReactions.reactionType'] }, then: 'liked' }, // Если есть "like", ставим "liked"
              { case: { $in: ['dislike', '$userReactions.reactionType'] }, then: 'disliked' }, // Если есть "dislike", ставим "disliked"
            ],
            default: 'none', // По умолчанию, если реакции нет, ставим "none"
          },
        },
      },
    },

    // Этап 4: Удаление промежуточного поля userReactions
    {
      $unset: ['userReactions'], // Убираем промежуточное поле userReactions
    },
  ]);
  return post[0];
};

export const editPostById = async <T>(postId: string, newPostData: EditPostType) => {
  await mongooseConnect();
  const oldPost = await Models.Post.findByIdAndUpdate(postId, newPostData, { new: false })
    .lean<T>()
    .exec();

  return oldPost;
};
export const deletePostById = async <T>(postId: string) => {
  await mongooseConnect();
  const deletePost = await Models.Post.findByIdAndDelete(postId).lean<T>().exec();

  return deletePost;
};
