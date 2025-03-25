'use client';
import React from 'react';
import DeafultItem from '../DeafultItem/DeafultItem';
import { FaRegTrashAlt } from 'react-icons/fa';
import { clearPlayer } from '@/redux/slices/PlayerSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { deletePlaylistAction } from '@/actions/playlist';
import { Slide, toast } from 'react-toastify';
import { useRouter } from 'nextjs-toploader/app';

const DeletePlaylist = ({
  playlistId,
  closePopup,
}: {
  playlistId: string;
  closePopup: () => void;
}) => {
  const currentUsername = useAppSelector((state) => state.userReducer.user?.username);
  const router = useRouter();
  const deleteAction = async () => {
    const res = await deletePlaylistAction(playlistId);
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
    // closePopup();
    router.push(`user/${currentUsername}/library`);
  };
  return <DeafultItem title="Удалить плейлист" Icon={FaRegTrashAlt} action={deleteAction} />;
};

export default DeletePlaylist;
