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

const PostOptionals = ({ authorId, postId }: { authorId: string; postId: string }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const currentUserId = useAppSelector((state) => state.userReducer.user?._id);
  const isCurrentUserAuthor = authorId === currentUserId;
  const deletePostOnClick = async () => {
      console.log(123)
    toast.info('Пост удаляется...')
    const res = await deletePostByIdA(postId);
    console.log(res)
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
  if (!isCurrentUserAuthor) {
    return <div></div>;
  }
  return (
    <>
      <div className={s.postOptionals}>
        <ul className={s.postOptionals_list}>
          <li className={cn(s.postOptionals_edit, s.postOptionals_option)}>
            <Link href={`/post/${postId}/edit`}>
              <MdEdit size={20} />
            </Link>
            <p className={s.postDescription}>Редактирование поста</p>
          </li>
          <li className={cn(s.postOptionals_delete, s.postOptionals_option)}>
            <button onClick={() => setIsDeleteModalOpen(true)}>
              <MdDelete size={20} />
            </button>
            <p style={{ color: '#ff6161' }} className={s.postDescription}>
              Удалить пост
            </p>
          </li>
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
