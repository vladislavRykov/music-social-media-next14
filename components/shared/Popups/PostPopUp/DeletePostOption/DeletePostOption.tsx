import React from 'react';
import DefaultPostOption from '../DefaultPostOption/DefaultPostOption';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { deletePostByIdA } from '@/actions/post';
import { deleteOneImg } from '@/actions/files';

interface Props {
  closePopup: () => void;
  postId: string;
}

const DeletePostOption = ({ closePopup, postId }: Props) => {
  const deletePost = async () => {
    toast.info('Пост удаляется...');
    const res = await deletePostByIdA(postId);
    if (!res.ok) {
      toast.error(res.message);
    } else {
       res.data?.image_url &&  await deleteOneImg(res.data.image_url);
      toast.success(res.message);
    }

    closePopup();
  };
  return (
    <DefaultPostOption Icon={MdDelete} title="Удалить" action={deletePost} color="#ff6161" />
  );
};

export default DeletePostOption;
