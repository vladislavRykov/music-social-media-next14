
import React from 'react'
import DefaultOption from '../DefaultOption/DefaultOption'
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteMessageByIdAction } from '@/actions/message';
import { toast } from 'react-toastify';
import { useRouter } from 'nextjs-toploader/app';
import { FaRegUser } from "react-icons/fa";

interface Props   {
    closePopup: () => void;
    userName: string,
}

const GoToProfile = ({closePopup,userName}:Props) => {
const router = useRouter()
const goToProfileFunction:React.MouseEventHandler<HTMLDivElement> =async (e)=>{
    e.preventDefault()
    router.push(`/user/${userName}`)
    closePopup()
}

  return (
    <DefaultOption action={goToProfileFunction} title='Перейти к профилю' Icon={FaRegUser}/>
  )
}

export default GoToProfile