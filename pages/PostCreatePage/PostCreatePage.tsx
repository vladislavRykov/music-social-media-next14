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
      <h2 className={s.postCreatePage_title}>
        Создание поста
        <div onClick={() => router.back()} className={s.postCreatePage_back}>
          <FaArrowLeft />
          <span>К постам</span>
        </div>
      </h2>
      <PostCreateForm />
    </div>
  );
};

export default PostCreatePage;
