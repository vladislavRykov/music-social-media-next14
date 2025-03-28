'use client'
import Image from 'next/image'
import React from 'react'
import mockAvatar from '@/public/avatar.jpg'
import s from './ChatUserItem.module.scss'
import { createDialogAction } from '@/actions/chat'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

type Props = {
    avatar?: string,
    username: string,
    _id: string,
    closePopup: ()=>void,
}

const ChatUserItem = ({avatar,_id,username,closePopup}:Props) => {
  const router = useRouter()
  const onUserClick = async () => {
    console.log(_id)
        const res = await createDialogAction(_id)
        console.log(123)
        if(!res.ok) return toast.error(res.message)
        router.push(`/chat/${res.data?._id}`)
        closePopup()

    }

  return (
    <div className={s.chatUserItem} onClick={onUserClick}>
        <Image  className={s.chatUserItem_ava} src={avatar||mockAvatar} alt='avatar' height={40} width={40}/>
        <div  className={s.chatUserItem_username}>{username}</div>
    </div>
  )
}

export default ChatUserItem