import { deletePlaylistImg } from '@/dal/playlist';
import { FaRegTrashAlt } from 'react-icons/fa';
import React from 'react';
import DeafultItem from '../DeafultItem/DeafultItem';
import { toast } from 'react-toastify';
import { deleteOneImg } from '@/actions/files';

const DeletePlaylistImg = ({
  playlistId,
  closePopup,
}: {
  playlistId: string;
  closePopup: () => void;
}) => {
  const removeAction = async () => {
    try {
    const playlistBeforeUpdate = await deletePlaylistImg(playlistId);
     await deleteOneImg(playlistBeforeUpdate?.playlistImg as string)
      toast.success('Изображение удалено.');
      closePopup();
    } catch (error) {
      toast.error('Ошибка: Изображение не удалено.');
    }
  };

  return (
    <DeafultItem title="Удалить свое изображение" Icon={FaRegTrashAlt} action={removeAction} />
  );
};

export default DeletePlaylistImg;
