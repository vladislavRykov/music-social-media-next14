import { findAllCurrentUserChatsAction } from '@/actions/chat'
import Image from 'next/image'
import React from 'react'
import LoadingSvg from '@/public/circleTube.svg'
import ChatListItem from '../../ChatList/ChatListItem/ChatListItem'
import { useAsync } from '@/hooks/useFetching'
import { useParams } from 'next/navigation'
import { useDebounce } from '@/hooks/hooks'

type Props={
    searchValue: string
}

const ChatDialogSearch = ({searchValue}:Props) => {
  const params:{slug?: string[]}|null = useParams()
  const debouncedValue =  useDebounce(searchValue)
  const fetchChats = async()=>{
    const res =await findAllCurrentUserChatsAction()
    if(!res.ok) throw new Error(res.message)

    const filteredChats = res.data?.filter((chat)=>chat.chatName.toLowerCase().includes(searchValue.toLowerCase()) )
    return filteredChats
    }

const {execute,status,data:responseData,error}=useAsync(fetchChats,[debouncedValue])


return (
<div>
    {status ==='pending' && <Image src={LoadingSvg} alt='loading...' height={100} width={100}/>}
    {status ==='success' && responseData && responseData.map((chat,idx)=><ChatListItem chatId={chat._id} selectedChat={params?.slug?.[0]||null} key={idx} chatName={chat.chatName} type={chat.type} chatImg={chat.chatImg||null} lastMessage={chat.lastMessage &&  {from: {userId: chat.lastMessage.author._id.toString(),username: chat.lastMessage.author.username},message: chat.lastMessage.text,        time: chat.lastMessage.createdAt}}/>)}
</div>
)
}

export default ChatDialogSearch