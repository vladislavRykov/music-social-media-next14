import React from 'react';
import DefaultOption from '../DefaultOption/DefaultOption';
import { toast } from 'react-toastify';
import { blockUser } from '@/actions/relations';
import { MdBlock } from 'react-icons/md';

interface Props {
  closePopup: () => void;
  userIdToBlock: string;
}

const BlockUserOption = ({ closePopup, userIdToBlock }: Props) => {
  const blockAction = async () => {
    const res = await blockUser(userIdToBlock);
    res.ok ? toast.success(res.message) : toast.error(res.message);
    closePopup();
  };

  return <DefaultOption action={blockAction} title="Заблокировать" Icon={MdBlock} color="red" />;
};

export default BlockUserOption;
