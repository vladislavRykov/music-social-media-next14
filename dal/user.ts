'use server';
import bcrypt from 'bcryptjs';
import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import {
  LoginData,
  RegistrationData,
  SessionPayload,
  UserDataMongoose,
  UserMainFields,
  UserProfileData,
} from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/sessions';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import {
  addFriendRequestT,
  FriendRequestMongoosePopulatedT,
  FriendRequestStatus,
} from '@/types/relationT';
import { Overwrite } from '@/types/common';
import { ObjectId } from 'mongodb';

type ResponseData = {
  message: string;
};
export const getSession = async () => {
  try {
    const session = await verifySession();

    if (!session) {
      return redirect('/login');
    }
    return session;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getMe = cache(async () => {
  try {
    const session = await verifySession();
    if (!session) {
      return redirect('/login');
    }
    const user = await Models.User.findById(session.userId);
    if (!user) {
      return null;
    }
    const { password, ...userWithOutPass } = user._doc;
    return userWithOutPass;
  } catch (error) {
    return null;
  }
});
export const getUserMainFields = cache(async () => {
  try {
    const session = await verifySession();
    if (!session) {
      return redirect('/login');
    }
    const user = await Models.User.findById(session.userId);
    console.log(user);
    if (!user) {
      return null;
    }
    const {
      _id,
      email,
      username,
      createdAt,
      aboutMe,
      updatedAt,
      avatar,
      isAdmin,
      banner,
      location,
    }: UserMainFields = user._doc;
    return {
      _id: _id.toString(),
      banner,
      username,
      aboutMe,
      email,
      createdAt,
      updatedAt,
      avatar,
      isAdmin,
      location,
    };
  } catch (error) {
    return null;
  }
});
export const getUserMainFieldsById = cache(async (userId: string) => {
  try {
    const user = await Models.User.findById(userId);
    console.log(user);
    if (!user) {
      return null;
    }
    const {
      _id,
      email,
      username,
      createdAt,
      aboutMe,
      updatedAt,
      avatar,
      isAdmin,
      banner,
      location,
    }: UserMainFields = user._doc;
    return {
      _id: _id.toString(),
      banner,
      username,
      aboutMe,
      email,
      createdAt,
      updatedAt,
      avatar,
      isAdmin,
      location,
    };
  } catch (error) {
    return null;
  }
});
export const replaceUserAvatar = cache(async (imgUrl: string) => {
  try {
    await mongooseConnect();
    const session = await verifySession();
    if (!session) {
      return redirect('/login');
    }
    const user = await Models.User.findById(session.userId);
    if (!user) {
      return { ok: false, message: 'Пользователь не найден.' };
    }
    const oldAva: string | undefined = user.avatar;
    user.avatar = imgUrl;
    await user.save();
    return { ok: true, message: 'Аватарка успешно загружена.', deletedAvaUrl: oldAva || null };
  } catch (error) {
    return { ok: false, message: 'Ошибка при загрузки аватарки.' };
  }
});
export const replaceUserBanner = cache(async (imgUrl: string) => {
  try {
    await mongooseConnect();
    const session = await verifySession();
    if (!session) {
      return redirect('/login');
    }
    const user = await Models.User.findById(session.userId);
    if (!user) {
      return { ok: false, message: 'Пользователь не найден.' };
    }
    const oldBanner: string | undefined = user.banner;
    user.banner = imgUrl;
    await user.save();
    return { ok: true, message: 'Аватарка успешно загружена.', deletedBanerUrl: oldBanner || null };
  } catch (error) {
    return { ok: false, message: 'Ошибка при загрузки аватарки.' };
  }
});
export const setAboutMe = cache(async (aboutMe: string) => {
  try {
    await mongooseConnect();
    const session = await verifySession();
    if (!session) {
      return redirect('/login');
    }
    const user = await Models.User.findById(session.userId);
    if (!user) {
      return { ok: false, message: 'Пользователь не найден.' };
    }
    user.aboutMe = aboutMe;
    await user.save();
    return { ok: true, message: 'Изменения сохранены.' };
  } catch (error) {
    return { ok: false, message: 'Ошибка при сохранении изменений.' };
  }
});

export const getUserProfByUserName = async (userName: string) => {
  try {
    const user = await Models.User.findOne({ username: userName });
    if (!user) {
      return null;
    }
    const { _id, username, avatar, banner }: UserProfileData = user._doc;
    return {
      _id: _id.toString(),
      banner,
      username,
      avatar,
    };
  } catch (error) {
    return null;
  }
};

//Account changes

export const setNewUserName = async (newUsername: string, userId: string) => {
  await mongooseConnect();

  const user = await Models.User.findById(userId);
  if (!user) {
    return { ok: false, message: 'Пользователь не найден' };
  }
  user.username = newUsername;
  user.save();
  return { ok: true, message: `Имя пользователя было изменено на ${newUsername}` };
};
// export const getUserById = async (userId: string) => {
//   await mongooseConnect();

//   const user = await Models.User.findById(userId).lean<UserDataMongoose>();
// return user
// };

export const searchUsersByUsername = async (
  searchString: string,
  pageSize = 10,
  currentPage = 1,
  selectedFields: string[] = ['username', 'avatar', '_id'],
) => {
  const skipCount = (currentPage - 1) * pageSize;
  console.log(selectedFields.join(' '));
  const users = await Models.User.find({
    username: { $regex: searchString, $options: 'i' }, // Поиск по регулярному выражению с игнорированием регистра
  })
    .select(selectedFields)
    .sort({ createdAt: -1 }) // Сортировка по убыванию
    .skip(skipCount)
    .limit(pageSize);
  return users;
};
export const searchUsersByUsernameScroll = async <T>(
  {
    searchString,
    currentUserId,
    lastPostId,
    limit = 10,
    selectedFields = ['username', 'avatar', '_id'],
  }: {
    searchString: string;
    lastPostId: string | null;
    currentUserId?: string;
    limit?: number;
    selectedFields: string[];
  },

  populate?: { path: string; select?: string }[],
) => {
  await mongooseConnect();
  const idSortFilter = { _id: { $lt: lastPostId } };
  // { _id: { $gt: lastPostId } }
  let filters: any = lastPostId
    ? { ...idSortFilter, username: { $regex: searchString, $options: 'i' } }
    : { username: { $regex: searchString, $options: 'i' } };
  if (currentUserId) {
    filters = { ...filters, _id: { $ne: currentUserId } };
  }
  const query = Models.User.find(filters)
    .select(selectedFields)
    .sort({ createdAt: -1 }) // сортируем по убыванию _id
    .limit(limit);

  if (populate) {
    query.populate(populate);
  }
  const users = await query.lean<T>().exec();
  return users;
};
export const getUserLocation = async (userId: string) => {
  await mongooseConnect();
  const user = await Models.User.findById(userId).lean<UserDataMongoose>();

  return user && user.location;
};
export const setUserLocation = async (userId: string, newLocationSlug: string) => {
  await mongooseConnect();
  const updatedUser = await Models.User.findByIdAndUpdate(
    userId,
    { location: newLocationSlug },
    { new: true },
  ).lean<UserDataMongoose>();
  return updatedUser;
};

export const pushNewFriendRequest = async (to: string, requestData: addFriendRequestT) => {
  await mongooseConnect();
  const updatedUser = await Models.User.findByIdAndUpdate(
    to,
    {
      $push: { friendRequests: { ...requestData, status: FriendRequestStatus.Pending } },
    },
    { new: true },
  );
};
export const checkIfRequestExists = async (to: string, from: string) => {
  await mongooseConnect();
  const isExists = await Models.User.exists({ _id: to, 'friendRequests.from': from });
  return isExists;
};
// export const getFriendReqByFromAndStatus =  async (
//   currentUserId: string,
//   status: FriendRequestStatus = FriendRequestStatus.Pending,
// ): Promise<FriendRequestMongoosePopulatedT[] | null> => {
//   await mongooseConnect();
//   const requests: FriendRequestMongoosePopulatedT[] | null = await Models.User.aggregate([
//     { $match: { _id: new ObjectId(currentUserId) } },
//     { $unwind: '$friendRequests' },
//     { $match: { 'friendRequests.status': status } },
//     {
//       $lookup: {
//         from: 'users',
//         localField: 'friendRequests.from',
//         foreignField: '_id',
//         as: 'fromUser',
//       },
//     },
//     { $unwind: '$fromUser' },
//     {
//       $project: {
//         _id: '$friendRequests._id',
//         from: {
//           _id: '$fromUser._id',
//           username: '$fromUser.username',
//           avatar: '$fromUser.avatar',
//         },
//         status: '$friendRequests.status',
//         createdAt: '$friendRequests.createdAt',
//       },
//     },
//   ]);
//   return requests;
// };
export const changeFriendRequestStatus = async (
  to: string,
  requestId: string,
  newStatus: FriendRequestStatus,
) => {
  await mongooseConnect();
  const oldUser = await Models.User.findOneAndUpdate(
    { _id: to, 'friendRequests._id': requestId },
    { $set: { 'friendRequests.$.status': newStatus } },
  ).lean<UserDataMongoose>();
  return oldUser?.friendRequests || null;
};
export const getCurrentUserFriendRequests = async (
  currentUserId: string,
  status: FriendRequestStatus = FriendRequestStatus.Pending,
): Promise<FriendRequestMongoosePopulatedT[] | null> => {
  await mongooseConnect();
  const requests: FriendRequestMongoosePopulatedT[] | null = await Models.User.aggregate([
    { $match: { _id: new ObjectId(currentUserId) } },
    { $unwind: '$friendRequests' },
    { $match: { 'friendRequests.status': status } },
    {
      $lookup: {
        from: 'users',
        localField: 'friendRequests.from',
        foreignField: '_id',
        as: 'fromUser',
      },
    },
    { $unwind: '$fromUser' },
    {
      $project: {
        _id: '$friendRequests._id',
        from: {
          _id: '$fromUser._id',
          username: '$fromUser.username',
          avatar: '$fromUser.avatar',
        },
        status: '$friendRequests.status',
        createdAt: '$friendRequests.createdAt',
      },
    },
  ]);
  return requests;
};
export const countUserFriendRequests = async (
  currentUserId: string,
  status: FriendRequestStatus = FriendRequestStatus.Pending,
) => {
  await mongooseConnect();
  const requestCount: { total: number }[] = await Models.User.aggregate([
    { $match: { _id: new ObjectId(currentUserId) } },
    { $unwind: '$friendRequests' },
    { $match: { 'friendRequests.status': status } },
    { $count: 'total' },
  ]);
  return requestCount.length === 0 ? 0 : requestCount[0].total;
};
