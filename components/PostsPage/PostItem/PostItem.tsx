import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import s from './PostItem.module.scss';
import { MongoosePost, MongoosePostReactionT } from '@/types/postTypes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'classnames';
import { MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md';
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import PostSettings from './PostSettings/PostSettings';
import FullImageModal from './FullImageModal/FullImageModal';
import PostLikesBtn from './PostLikesBtn/PostLikesBtn';

interface Props extends MongoosePostReactionT {
  isPostsAuthor: boolean;
}

const PostItem = ({
  _id,
  title,
  content,
  image_url,
  isPostsAuthor,
  reactionStatus,
  likes,
}: Props) => {
  const pathname = usePathname();
  const [isFullContent, setIsFullContent] = useState(false);
  const [isFullImgModalOpen, setIsFullImgModalOpen] = useState(false);
  console.log(pathname);
  return (
    <>
      <div className={s.postItem}>
        {image_url && (
          <div className={s.postItem_imgWrapper}>
            <Image
              onClick={() => setIsFullImgModalOpen(true)}
              className={s.postItem_image}
              src={image_url}
              fill
              alt="post image"
            />
            {isPostsAuthor && (
              <div className={s.postItem_settings}>
                <PostSettings postId={_id} />
              </div>
            )}
          </div>
        )}
        <Link href={pathname + `/${_id}`}>
          <h2 className={s.postItem_title}>{title}</h2>
        </Link>
        <p className={cn(s.postItem_text, { [s.postItem_hiddenContent]: !isFullContent })}>
          {content +
            't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using , making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'}
        </p>
        <div className={s.postItem_grid}>
          {!isFullContent ? (
            <button className={s.postItem_contentBtn} onClick={() => setIsFullContent(true)}>
              <MdOutlineKeyboardDoubleArrowDown />
              <span>Читать дальше</span>
            </button>
          ) : (
            <button className={s.postItem_contentBtn} onClick={() => setIsFullContent(false)}>
              <MdOutlineKeyboardDoubleArrowUp />
              <span>Скрыть</span>
            </button>
          )}
         {!isPostsAuthor && <PostLikesBtn postId={_id} likes={likes} reactionStatus={reactionStatus} />}
        </div>
      </div>
      {isFullImgModalOpen && image_url && (
        <FullImageModal  imgSrc={image_url} closeModal={() => setIsFullImgModalOpen(false)} />
      )}
    </>
  );
};

export default PostItem;
