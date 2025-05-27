'use server';
import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { Genre, MusicData, MusicDataWithReactionT } from '@/types/types';
import { ObjectId } from 'mongodb';

export const getMusicById = async (musicId: string) => {
  await mongooseConnect();
  const music = await Models.Music.findById(musicId).lean<MusicData>();
  return music;
};
export const getMusicByIdWithIsLiked = async (musicId: string, currentUserId?: string) => {
  await mongooseConnect();
  // const music = await Models.Music.findById(musicId).lean<MusicData>();
  const musics: MusicDataWithReactionT[] = await Models.Music.aggregate([
    // Начало агрегационного запроса для модели Post
    // Этап 1: Выборка всех постов (можно дополнительно наложить фильтры)
    { $match: { _id: new ObjectId(musicId) } }, // Здесь пока пустое условие, значит будут выбраны все посты

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
                  { $eq: ['$targetType', 'Music'] }, // Проверка типа реакции ("Post")
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

  return musics[0];
};
export const getArrayMusicByIdWithIsLiked = async (musicIds: string[]|ObjectId[], currentUserId?: string) => {
  await mongooseConnect();
  const musics: MusicDataWithReactionT[] = await Models.Music.aggregate([
    // Начало агрегационного запроса для модели Post
    // Этап 1: Выборка всех постов (можно дополнительно наложить фильтры)
    { $match: { _id: { $in: musicIds } } }, // Здесь пока пустое условие, значит будут выбраны все посты

    // Этап 2: Соединение коллекции Post с Reactions (для проверки реакций конкретного пользователя)
    {
      $lookup: {
        // Оператор агрегации для присоединения внешних данных
        from: 'reactions', // Внешняя коллекция, с которой хотим присоединиться
        let: { musicId: '$_id' }, // Переменная, хранящая ID текущего обрабатываемого поста
        pipeline: [
          // Внутренний трубопровод обработки данных из внешней коллекции
          {
            $match: {
              // Отбор необходимых реакций
              $expr: {
                // Выражение для фильтрации
                $and: [
                  // Логическое AND для комбинации условий
                  { $eq: ['$targetId', '$$musicId'] }, // Проверка совпадения targetId (ID поста) с текущим постом
                  { $eq: ['$userId', new ObjectId(currentUserId)] }, // Проверка совпадения userId с указанным пользователем
                  { $eq: ['$targetType', 'Music'] }, // Проверка типа реакции ("Post")
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

  return musics;
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



type Fields = {
  dislikes?: number;
  likes?: number;
};

export const changeMusicLikeOrDislike = async (songId: string, { dislikes, likes }: Fields) => {
  await mongooseConnect();
  const inc: any = {};
  if (dislikes) inc.dislikes = dislikes;
  if (likes) inc.likes = likes;
  await Models.Music.findOneAndUpdate(
    { _id: songId }, // Условия поиска
    { $inc: inc }, // Уменьшение поля score на 1
    { new: true }, // Возвращает обновленный документ
  );
};
