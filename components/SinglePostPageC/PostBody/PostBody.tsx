import { MongoosePost, MongoosePostReactionT } from '@/types/postTypes';
import Image from 'next/image';
import React from 'react';
import s from './PostBody.module.scss';

type Props = {
  post: MongoosePostReactionT;
};

const PostBody = ({ post }: Props) => {
  const postTime = new Date(post?.createdAt || '').toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const postDate = new Date(post?.createdAt || '')
    .toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '.');
  return (
    <div className={s.postBody}>
      {post.image_url && (
        <div
          style={{ '--bg-image': `url(${post.image_url})` } as React.CSSProperties}
          className={s.postImage_container}>
          <Image
            blurDataURL="/background/lightModeImgPlaceholder.svg"
            placeholder="blur"
            className={s.postImage}
            src={post?.image_url}
            fill
            alt="post image"
          />
        </div>
      )}
      <h2 className={s.postBody_title}>{post.title}</h2>
      <p className={s.postBody_content}>{post.content}</p>
      <div className={s.postBody_postInfo}>
        <div className={s.postBody_createdAt}>{postTime + ', ' + postDate}</div>
      </div>
    </div>
  );
};

export default PostBody;
