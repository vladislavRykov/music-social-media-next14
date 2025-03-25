import React, { useState } from 'react';
import DeafultItem from '../DeafultItem/DeafultItem';
import {  MdOutlinePlaylistRemove } from 'react-icons/md';
import PlaylistActionModal from '../../Modals/PlaylistActionModal/PlaylistActionModal';
import { Slide, toast } from 'react-toastify';
import { removeItemsToPlaylistAction } from '@/actions/playlist';

const RemoveFromPlayList = ({
  itemsToRemove,
  playlistId,
  closePopup,
}: {
  itemsToRemove: string[];
  playlistId: string;
  closePopup: () => void;
}) => {
  const removeAction = async () => {
    const res = await removeItemsToPlaylistAction(playlistId, itemsToRemove);
    if (!res.ok) toast.error(res.message);
    else toast.info(res.message, {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Slide,
      });
    closePopup();
  };
  return (
    <DeafultItem title="Удалить из плейлиста" Icon={MdOutlinePlaylistRemove} action={removeAction} />
  );
};

export default RemoveFromPlayList;
