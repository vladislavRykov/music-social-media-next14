'use client';
import React from 'react';
import { toast } from 'react-toastify';
import s from './PostCreatePage.module.scss';
import ImgDropBox from '@/components/UI/ImgDropBox/ImgDropBox';
import PostImgDropBox from '@/components/PostCreate/PostImgDropBox/PostImgDropBox';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'nextjs-toploader/app';
import PostCreateForm from '@/components/PostCreate/PostCreateForm/PostCreateForm';

const PostCreatePage = () => {
  const router = useRouter();

  return (
    <div className={s.postCreatePage}>
      <div className={s.postCreatePage_postHeader}>
        <div onClick={() => router.back()} className={s.postCreatePage_back}>
          <FaArrowLeft />
          <span>К постам</span>
        </div>
        <h2 className={s.postCreatePage_title}>Создание поста</h2>
      </div>
      <PostCreateForm />
    </div>
  );
};

export default PostCreatePage;
