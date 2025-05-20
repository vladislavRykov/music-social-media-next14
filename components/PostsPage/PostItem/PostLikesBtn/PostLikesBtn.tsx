import { ItemReactionStatus, LikeOrDislike, TargetTypes } from '@/types/likeAndDislikes';
import React, { useState } from 'react';
import { IoHeartCircle } from 'react-icons/io5';
import s from './PostLikesBtn.module.scss';
import { setReactionToTargetA } from '@/actions/reaction';
import cn from 'classnames'

type Props = {
  likes: number;
  reactionStatus: ItemReactionStatus;
  postId: string;
};

const PostLikesBtn = ({ likes, reactionStatus, postId }: Props) => {
  const [reaction, setReaction] = useState(reactionStatus);
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
    <div className={s.postLikesBtn}>
      <button
        onClick={reaction === ItemReactionStatus.Liked ? setRemoveReaction : setLike}
        className={cn(s.postLikesBtn_btn, {
          [s.postLikesBtn_liked]: reaction === ItemReactionStatus.Liked,
        })}>
        <IoHeartCircle size={20} className={s.postLikesBtn_icon} />
        {!!likeCount && likeCount !== 0 && (
          <span className={s.postLikesBtn_count}>{likeCount}</span>
        )}
      </button>
    </div>
  );
};

export default PostLikesBtn;
