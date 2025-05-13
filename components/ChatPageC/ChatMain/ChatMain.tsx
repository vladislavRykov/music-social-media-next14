'use client'
import React, { useEffect, useRef } from 'react'
import s from './ChatMain.module.scss'
import { CSSProperties } from 'styled-components';
import avatar from '@/public/avatar.jpg'
import chatBG from '@/public/chatBG2.jpg'
import LoadingSvg from '@/public/circleTube.svg'
import ChatMessage from './ChatMessage/ChatMessage';
import MessageBlock from './MessageBlock/MessageBlock';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useParams } from 'next/navigation';
import ChatMessagesList from './ChatMessagesList/ChatMessagesList';
import { useAsync } from '@/hooks/useFetching';
import { findMessagesByChatIdAction } from '@/actions/message';
import Image from 'next/image';
import { ChatMessageT } from '@/types/messageT';


const ChatMain = () => {
  const isPlayerShown = useAppSelector(state=>state.playerReducer.showPlayer)
  const params:{slug?: string[]}|null = useParams()

  const fetchMessages = async()=>{
    if(params?.slug?.[0]){

      const res = await findMessagesByChatIdAction(params.slug[0])
      console.log(res)
      if(!res.ok) throw new Error(res.message)
      return res.data
    }else{
      return null
    }
  }

  const {execute,status,data,error,helpers}= useAsync(fetchMessages,[params?.slug?.[0]])



 const backgroundImageStyle: CSSProperties = {
    paddingBottom: isPlayerShown ? '80px' : '0px'
  };

  if(!params?.slug){
    return (<div className={s.chatMain} style={backgroundImageStyle}>
      <div className={s.chatMain_chatNotSelected} >
        Тут появиться выбранный чат
      </div>
    </div>)
  }

  return (
    <div className={s.chatMain} style={backgroundImageStyle}>
      <div className={s.chatMain_content}>
      {status==='pending'&& <Image src={LoadingSvg} height={100} width={100} alt='loading...'/>}
      {status==='success'&&data&&<ChatMessagesList messages={data} removeMessage={(messageId:string)=>helpers.setData(prev=>prev && prev.filter(message=>message._id!==messageId))}/>}
      </div>
      <MessageBlock addNewMessage={(data:ChatMessageT)=>helpers.setData(prev=>prev && [...prev,data])} chatId={params?.slug[0]}/>
    </div>
  )
}

export default ChatMain