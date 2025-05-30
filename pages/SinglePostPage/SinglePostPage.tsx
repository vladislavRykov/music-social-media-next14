'use client';
import React from 'react';
import s from './SinglePostPage.module.scss';
import { MongoosePost, MongoosePostReactionT } from '@/types/postTypes';
import Image from 'next/image';
import { useAppSelector } from '@/hooks/reduxHooks';
import PostBody from '@/components/SinglePostPageC/PostBody/PostBody';
import PostOptionals from '@/components/SinglePostPageC/PostOptionals/PostOptionals';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'nextjs-toploader/app';

type Props = {
  postData: { ok: boolean; data: MongoosePostReactionT | null; message: string };
};

const SinglePostPage = ({ postData: { data: post, message } }: Props) => {
  const isPlayerShown = useAppSelector((state) => state.playerReducer.showPlayer);
  const router = useRouter();
  if (!post) {
    return <div className={s.errorBody}>{message}</div>;
  }
  return (
    <div style={isPlayerShown ? { paddingBottom: '80px' } : {}} className={s.singlePostPage}>
      <div onClick={() => router.back()} className={s.singlePostPage_back}>
        <FaArrowLeft />
        <span>К постам</span>
      </div>
      <PostBody post={post} />
      <PostOptionals likes={post.likes} reactionStatus={post.reactionStatus} postId={post._id} authorId={post.author} />
    </div>
  );
};

export default SinglePostPage;
