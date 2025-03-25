'use server';
import { verifySession } from '@/lib/sessions';
import {
  createLikeOrDislike,
  deleteLikeOrDislike,
  getAllUserLikeAndDislike,
  getFavItemsByUserId,
  getLikeOrDislike,
  setLikeOrDislike,
} from '@/dal/likesAndDislikes';
import { LikeAndDislike, LikeOrDislike } from '@/types/likeAndDislikes';
import { changeMusicLikeOrDislike } from '@/dal/music';
import { getUserProfByUserName } from '@/dal/user';
import { Overwrite } from '@/types/common';
import { MusicData } from '@/types/types';

export const setLikeOrDislikeA = async ({
  songId,
  type,
}: {
  songId: string;
  type: LikeOrDislike;
}) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null,message: 'Вы не авторизированы' };
    }
    const likesAndDis = await getLikeOrDislike({ userId: session.userId, songId });
    const likeOrDisString = type === LikeOrDislike.Like ? '' : 'не';
    if (!likesAndDis) {
      const newLikesAndDis = await createLikeOrDislike({
        userId: session.userId,
        songId,
        type,
      });
      console.log(newLikesAndDis);
      const likeDis = type === LikeOrDislike.Like ? {likes: 1} :{dislikes: 1}
    await changeMusicLikeOrDislike(songId,likeDis)
      return {
        ok: true,
        data: newLikesAndDis,
        type,
        message: `Трек добавлен в ${likeOrDisString}понравившуюся музыку.`,
      };
    } else {
      const updatedLikeAndDislike = await setLikeOrDislike({
        userId: session.userId,
        songId,
        type,
      });
      const likeDis = type === LikeOrDislike.Like ? {likes: 1,dislikes: -1} :{dislikes: 1,likes: -1}
      await changeMusicLikeOrDislike(songId,likeDis)
      return {
        ok: true,
        data: updatedLikeAndDislike,
        type,
        message: `Трек добавлен в ${likeOrDisString}понравившуюся музыку.`,
      };
    }
  } catch (error) {
    console.log(323,error)
    return { ok: false, data: null, message: 'Не удалось провести это действие.' };
  }
};
export const removeLikeOrDislike = async ({ songId }: { songId: string }) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }
    const likesAndDis = await getLikeOrDislike({ userId: session.userId, songId });
    if (!likesAndDis)
      return { ok: false, message: 'Ошибка: Лайка или дизлайка на этом треке не стояло.' };
    const deletedObj = await deleteLikeOrDislike({ userId: session.userId, songId });
const likeDis = deletedObj.type === LikeOrDislike.Like ? {likes: -1} :{dislikes: -1}
    await changeMusicLikeOrDislike(songId,likeDis)
    const likeOrDisString = deletedObj.type === LikeOrDislike.Like ? '' : 'не';
    console.log(deletedObj);
    return { ok: true, message: `Трек был удален из ${likeOrDisString}понравившейся музыки.` };
  } catch (error) {
    return { ok: false, data: null, message: 'Не удалось провести это действие.' };
  }
};

export const getAllUserLikeAndDislikeAction = async(userId?: string,populate?: string[])=>{
    try {
        const session = await verifySession();
        if (!session) {
          return { ok: false, message: 'Вы не авторизированы' };
          
        }
        const likesAndDises =  await getAllUserLikeAndDislike({userId: userId || session.userId})
        const likes = likesAndDises.filter(obj=>obj.type === LikeOrDislike.Like).map(obj=>obj.songId)
        const dislikes = likesAndDises.filter(obj=>obj.type === LikeOrDislike.Dislike).map(obj=>obj.songId)
        return { ok: true,data: {likes,dislikes}, message: 'Успешно.' };
    } catch (error) {
        return { ok: false,data: null, message: 'Ошибка.' };
    }
}
export const getAllUserLikeAndDislikeByUsernameAction = async(username: string,populate?: string[])=>{
    try {
        const session = await verifySession();
        if (!session) {
          return { ok: false, message: 'Вы не авторизированы' };
          
        }
        const user = await getUserProfByUserName(username)
        if(!user) return { ok: false, data:null,message: 'Такого пользователя не существует.' };
        const likesAndDises =  await getAllUserLikeAndDislike({userId: user._id})
        const likes = likesAndDises.filter(obj=>obj.type === LikeOrDislike.Like).map(obj=>obj.songId)
        const dislikes = likesAndDises.filter(obj=>obj.type === LikeOrDislike.Dislike).map(obj=>obj.songId)
        return { ok: true,data: {likes,dislikes,userId: user._id}, message: 'Успешно.' };
    } catch (error) {
        return { ok: false,data: null, message: 'Ошибка.' };
    }
}
export const getFavItemsByUsernameAction = async(username: string)=>{
    try {
        // const session = await verifySession();
        // if (!session) {
        //   return { ok: false, message: 'Вы не авторизированы' };
        // }
        const user = await getUserProfByUserName(username)
        if(!user) return { ok: false, data:null,message: 'Такого пользователя не существует.' };
        const likesAndDises =  await getFavItemsByUserId<LikeAndDislike[]>({userId:user._id})
        return { ok: true,data:likesAndDises, message: 'Успешно.' };
    } catch (error) {
        return { ok: false,data: null, message: 'Ошибка.' };
    }
}

type FavItems = Overwrite<LikeAndDislike,{songId: MusicData}>
export const getFavSongsByUsername = async(username: string)=>{
    try {
        // const session = await verifySession();
        // if (!session) {
        //   return { ok: false, message: 'Вы не авторизированы' };
        // }
        const user = await getUserProfByUserName(username)
        if(!user) return { ok: false, data:null,message: 'Такого пользователя не существует.' };
        console.log(777,user)
        const likeAndDisWithLike =  await getFavItemsByUserId<FavItems[]>({userId:user._id,populate: ['songId']})
        console.log('99grgeg',likeAndDisWithLike)
        const favSongs = likeAndDisWithLike.map(obj=>obj.songId)
        return { ok: true,data:favSongs, message: 'Успешно.' };
    } catch (error) {
        return { ok: false,data: null, message: 'Ошибка.' };
    }
}


