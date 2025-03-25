import React from 'react'
import DefaultOption from '../DefaultOption/DefaultOption'
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteMessageByIdAction } from '@/actions/message';
import { toast } from 'react-toastify';

interface Props   {
    closePopup: () => void;
    messageId: string,
}

const DeleteMessage = ({closePopup,messageId}:Props) => {

const deleteMessage =async ()=>{
  const res = await deleteMessageByIdAction(messageId)
  res.ok ? toast.success(res.message): toast.error(res.message)
    closePopup()
}

  return (
    <DefaultOption action={deleteMessage} title='Удалить' Icon={FaRegTrashCan} color='red'/>
  )
}

export default DeleteMessage