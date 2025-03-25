import EmojiPicker, {  EmojiClickData } from 'emoji-picker-react'
import React, { useState } from 'react'
import { FaRegSmile } from 'react-icons/fa'
import s from './EmojiPickerBlock.module.scss'
import Emoji, { Emojione, EmojioneV4, Twemoji } from "react-emoji-render";


type Props ={
  addEmojiToMessage: (emoji: string) => void;
}

const EmojiPickerBlock = ({addEmojiToMessage}:Props) => {
    const [isEmojiHovered,setIsEmojiHovered] = useState(false)


    const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
      addEmojiToMessage(emojiData.emoji)
        
    }    


  return (
    <div className={s.emojiPickerBlock}>
    < FaRegSmile className={s.emojiPickerBlock_emojiIcon} onMouseEnter={()=>setIsEmojiHovered(true)} onMouseLeave={()=>setIsEmojiHovered(false)} size={24}/>  
    <div onMouseEnter={()=>setIsEmojiHovered(true)} onMouseLeave={()=>setIsEmojiHovered(false)} className={s.emojiPickerBlock_emojiBlock}> 
        <EmojiPicker onEmojiClick={onEmojiClick} open={isEmojiHovered}/>  
      </div>         
      </div>
  )
}

export default EmojiPickerBlock