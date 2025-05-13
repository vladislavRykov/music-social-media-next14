'use client';
import React from 'react';
import { toast } from 'react-toastify';
import s from './PostEditPage.module.scss';
import ImgDropBox from '@/components/UI/ImgDropBox/ImgDropBox';
import PostImgDropBox from '@/components/PostCreate/PostImgDropBox/PostImgDropBox';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'nextjs-toploader/app';
import PostCreateForm from '@/components/PostCreate/PostCreateForm/PostCreateForm';
import { MongoosePost } from '@/types/postTypes';
import PostEditForm from '@/components/PostEditC/PostEditForm/PostEditForm';

type Props={
  postData: {
    ok: boolean;
    data: MongoosePost | null;
    message: string;
}
}

const PostEditPage = ({postData:{data:post,message}}:Props) => {
  const router = useRouter();
  if(!post) return <div>{message}</div>
  return (
    <div className={s.postEditPage}>
      <div className={s.postEditPage_postHeader}>
        <div onClick={() => router.back()} className={s.postEditPage_back}>
          <FaArrowLeft />
          <span>Вернуться</span>
        </div>
        <h2 className={s.postEditPage_title}>Редактирование поста</h2>
      </div>
      <PostEditForm post={post}/>
    </div>
  );
};

export default PostEditPage;
