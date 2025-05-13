'use client';
import React from 'react';
import DefaultPostOption from '../DefaultPostOption/DefaultPostOption';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

interface Props {
  closePopup: () => void;
  postId: string;
}

const EditPostOption = ({ closePopup, postId }: Props) => {
  const router = useRouter();
  const action = async () => {
    closePopup();
    router.push(`/post/${postId}/edit`);
  };
  return <DefaultPostOption Icon={MdEdit} title="Редктировать" action={action} />;
};

export default EditPostOption;
