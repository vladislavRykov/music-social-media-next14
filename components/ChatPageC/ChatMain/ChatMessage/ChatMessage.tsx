import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import s from './ChatMessage.module.scss';
import CurvedCorner from '@/components/UI/SVG/CurvedCorner';
import { UserProfileData } from '@/types/types';
import avatarMock from '@/public/avatar.jpg'
// import ChatPopup from '@/components/shared/Popups/ChatPopup/ChatPopup';
import DeleteMessage from '@/components/shared/Popups/ChatPopup/DeleteMessage/DeleteMessage';
import { ChatMessageT, MessageTypes } from '@/types/messageT';
import LinkHighlighter from '@/utils/LinkHighlighter';
import dynamic from 'next/dynamic';
import { useRouter } from 'nextjs-toploader/app';
const ChatPopup = dynamic(() => import('@/components/shared/Popups/ChatPopup/ChatPopup'))
import cn from 'classnames'

interface Props extends ChatMessageT   {
  time: number;
  isGroupChat?: boolean;
  removeMessage: (messageId:string)=>void

};

const ChatMessage = ({type,voiceSrc,removeMessage,_id,createdAt, isGroupChat=false,isCurrentUserMessage, text, unread = false, time, author,attachments ,chat}: Props) => {
  const formattedTime = createdAt.toTimeString().slice(0, 5)
  const router = useRouter()
  const [isPopupOpen,setIsPopupOpen]=useState(false)
  const [blockPosition,setBlockPosition]=useState({ x: '0', y: '0' })

  const onRightMouseClick:React.MouseEventHandler<HTMLDivElement> = (e)=>{
    e.preventDefault()
    
    setBlockPosition({
      y: `${e.nativeEvent.offsetY}px`,
      x: `${e.nativeEvent.offsetX}px`,
    })
    setIsPopupOpen(true)
  }
  
  return (

    <div
      className={s.chatMessage}
      style={isCurrentUserMessage ? { alignSelf: 'flex-end', flexDirection: 'row-reverse' } : {}}>
      <Image
        onClick={()=>router.push(`/user/${author.username}`)}
        className={s.chatMessage_image}
        src={author.avatar||avatarMock}
        alt="avatar"
        height={40}
        width={40}
      />
      <div
      onContextMenu={onRightMouseClick}
        className={cn(s.chatMessage_main,{[s.chatMessage_main_currentUser]:isCurrentUserMessage})}
        // style={
        //   isCurrentUserMessage ? { borderBottomRightRadius: '0px',backgroundColor: 'rgb(120,245,254)' } : { borderBottomLeftRadius: '0px' }
        // }
        >
        <div className={s.chatMessage_content}>
          {!isCurrentUserMessage && isGroupChat && <div className={s.chatMessage_username}>{author.username}</div>}
          <div className={s.chatMessage_message}>
            {
              type === MessageTypes.Text ?
              // text
              text && <LinkHighlighter text={text}/>
              :
                <div>
                  <audio controls src={voiceSrc} onLoadedMetadata={(e)=>console.log(e)}/>
                </div>
            }
            <span className={s.chatMessage_time} style={isCurrentUserMessage ?{color: '#fff'}:{}}>{formattedTime}</span>
          </div>
        </div>
    {isPopupOpen && <ChatPopup styles={{top: blockPosition.y,left: blockPosition.x}} closePopup={()=>setIsPopupOpen(false)}>
      <DeleteMessage messageId={_id} closePopup={()=>{
        removeMessage(_id)
        setIsPopupOpen(false)
      }
      }/>
    </ChatPopup>}
      </div>
    </div>


  );
};

export default ChatMessage;
