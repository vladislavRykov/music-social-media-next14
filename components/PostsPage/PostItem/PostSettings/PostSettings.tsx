'use client';
import React, { useState } from 'react';
import s from './PostSettings.module.scss';
import { BsThreeDotsVertical } from 'react-icons/bs';
import PostPopUp from '@/components/shared/Popups/PostPopUp/PostPopUp';
import DeletePostOption from '@/components/shared/Popups/PostPopUp/DeletePostOption/DeletePostOption';
import EditPostOption from '@/components/shared/Popups/PostPopUp/EditPostOption/EditPostOption';

const PostSettings = ({ postId }: { postId: string }) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  return (
    <div className={s.postSettings}>
      <div onClick={() => setIsPopUpOpen(true)} className={s.postSettings_btn}>
        <BsThreeDotsVertical />
      </div>
      {isPopUpOpen && (
        <PostPopUp closePopup={() => setIsPopUpOpen(false)} styles={{ top: '100%', left: '0px' }}>
          <DeletePostOption
            closePopup={() => {
              setIsPopUpOpen(false);
            }}
            postId={postId}
          />
          <EditPostOption
            closePopup={() => {
              setIsPopUpOpen(false);
            }}
            postId={postId}
          />
        </PostPopUp>
      )}
    </div>
  );
};

export default PostSettings;
