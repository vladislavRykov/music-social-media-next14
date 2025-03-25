'use client';
import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import IconBtn from '../../../UI/Buttons/IconBtn';
import s from './InnerPlaylistActions.module.scss';
import InnerPlaylistItems from './InnerPlaylistItems/InnerPlaylistItems';
import { IoAdd } from 'react-icons/io5';
import cn from 'classnames';

type InnerPlaylistActionsProps = {
  closeModal: () => void;
  goToCreatePlaylist: () => void;
  selectedItems: string[];
};

const InnerPlaylistActions: React.FC<InnerPlaylistActionsProps> = ({
  closeModal,
  goToCreatePlaylist,
  selectedItems,
}) => {
  const [animateBtn, setAnimateBtn] = useState(false);
  useEffect(() => {
    setAnimateBtn(true);
  }, []);
  return (
    <div className={s.innerPlaylistActions}>
      <div className={s.innerPlaylistActions_topBlock}>
        <span>Добавить в плейлист</span>
        <IconBtn onClick={closeModal} overlayStyles={{ backgroundColor: '#535f82' }}>
          <IoClose className={s.innerPlaylistActions_closeIcon} />
        </IconBtn>
      </div>
      <InnerPlaylistItems closeModal={closeModal} selectedItems={selectedItems} />
      <button
        onClick={goToCreatePlaylist}
        className={cn(s.innerPlaylistActions_createNewPlaylist, {
          [s.innerPlaylistActions_btnAnimate]: animateBtn,
        })}>
        <IoAdd className={s.innerPlaylistActions_createIcon} />
        <span>Новый</span>
      </button>
    </div>
  );
};

export default InnerPlaylistActions;
