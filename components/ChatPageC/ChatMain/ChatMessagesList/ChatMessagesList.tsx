import React, { useEffect, useRef } from 'react'
import s from './ChatMessagesList.module.scss'
import avatar from '@/public/avatar.jpg'
import ChatMessage from '../ChatMessage/ChatMessage'
import { UserProfileData } from '@/types/types'
import { ChatMessageT } from '@/types/messageT'


type Props=  {
   messages: ChatMessageT[];
   removeMessage: (messageId:string)=>void
  }

const ChatMessagesList = ({messages,removeMessage}:Props) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
      }
    
      useEffect(() => {
        scrollToBottom()
      }, [messages.length]);
  return (
    <div className={s.chatMessagesList}>
           {messages.map(message=>    <ChatMessage removeMessage={removeMessage} time={123} {...message}/>)}
           <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessagesList