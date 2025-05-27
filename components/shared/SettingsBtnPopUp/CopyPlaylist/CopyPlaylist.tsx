'use client';
import React from 'react';
import DeafultItem from '../DeafultItem/DeafultItem';
import { RiFileCopy2Fill } from "react-icons/ri";
import { deletePlaylistAction, savePlaylistToCurrentUserLibrary } from '@/actions/playlist';
import { Slide, toast } from 'react-toastify';

const CopyPlaylist = ({
  playlistId,
  closePopup,
}: {
  playlistId: string;
  closePopup: () => void;
}) => {
  const copyAction = async () => {
    const res = await savePlaylistToCurrentUserLibrary(playlistId);
    if (!res.ok) toast.error(res.message);
    else
      toast.info(res.message, {
        position: 'bottom-left',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'dark',
        transition: Slide,
      });
    closePopup();
  };
  return <DeafultItem title="Скопировать плейлист к себе" Icon={RiFileCopy2Fill} action={copyAction} />;
};

export default CopyPlaylist;
