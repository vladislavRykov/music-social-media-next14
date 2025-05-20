'use client';
import React, { useState } from 'react';
import s from './PostOptionals.module.scss';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import Link from 'next/link';
import cn from 'classnames';
import { useAppSelector } from '@/hooks/reduxHooks';
import DeletePostModal from './DeletePostModal/DeletePostModal';
import { deletePostByIdA } from '@/actions/post';
import { toast } from 'react-toastify';
import { useRouter } from 'nextjs-toploader/app';
import { FaHeart } from 'react-icons/fa';
import { ItemReactionStatus, LikeOrDislike, TargetTypes } from '@/types/likeAndDislikes';
import { setReactionToTargetA } from '@/actions/reaction';

type Props = {
  reactionStatus: ItemReactionStatus;
  likes: number;
  authorId: string;
  postId: string;
};

const PostOptionals = ({ authorId, postId, reactionStatus, likes }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const currentUserId = useAppSelector((state) => state.userReducer.user?._id);
  const isCurrentUserAuthor = authorId === currentUserId;
  const deletePostOnClick = async () => {
    console.log(123);
    toast.info('Пост удаляется...');
    const res = await deletePostByIdA(postId);
    console.log(res);
    if (!res.ok) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      const segments = pathname?.split('/');

      // Убираем последний сегмент
      segments?.pop();

      // Собираем новый путь
      const newPath = segments?.join('/');
      newPath && router.push(newPath);
    }

    setIsDeleteModalOpen(false);
  };
  const [reaction, setReaction] = useState(reactionStatus);
  console.log(reactionStatus);
  const [likeCount, setLikeCount] = useState(likes);
  const setLike = async () => {
    setReaction(ItemReactionStatus.Liked);
    setLikeCount((prev) => ++prev);
    await setReactionToTargetA({
      targetId: postId,
      targetType: TargetTypes.Post,
      reactionType: LikeOrDislike.Like,
    });
  };
  const setRemoveReaction = async () => {
    setReaction(ItemReactionStatus.None);
    setLikeCount((prev) => --prev);
    await setReactionToTargetA({
      targetId: postId,
      targetType: TargetTypes.Post,
      reactionType: null,
    });
  };

  return (
    <>
      <div className={s.postOptionals}>
        <ul className={s.postOptionals_list}>
          {isCurrentUserAuthor && (
            <li className={cn(s.postOptionals_edit, s.postOptionals_option)}>
              <Link href={`/post/${postId}/edit`}>
                <MdEdit size={20} />
              </Link>
              <p className={s.postDescription}>Редактирование поста</p>
            </li>
          )}
          {isCurrentUserAuthor && (
            <li className={cn(s.postOptionals_delete, s.postOptionals_option)}>
              <button onClick={() => setIsDeleteModalOpen(true)}>
                <MdDelete size={20} />
              </button>
              <p style={{ color: '#ff6161' }} className={s.postDescription}>
                Удалить пост
              </p>
            </li>
          )}
          {!isCurrentUserAuthor && (
            <li className={cn(s.postOptionals_like, s.postOptionals_option)}>
              <button onClick={reaction === ItemReactionStatus.Liked ? setRemoveReaction : setLike}>
                <FaHeart
                  className={cn({
                    [s.postOptionals_likedIcon]: reaction === ItemReactionStatus.Liked,
                  })}
                  size={20}
                />
              </button>
              <p style={{ color: '#ff6161' }} className={s.postDescription}>
                Поставить лайк
              </p>
            </li>
          )}
          {isCurrentUserAuthor && !!likeCount && (
            <li className={cn(s.postOptionals_likeCount, s.postOptionals_option)}>
              {likeCount+' лайков'}
              <p className={s.postDescription}>
                Количество лайков
              </p>
            </li>
          )}
        </ul>
      </div>
      {isDeleteModalOpen && (
        <DeletePostModal
          action={deletePostOnClick}
          closeModal={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  );
};

export default PostOptionals;
