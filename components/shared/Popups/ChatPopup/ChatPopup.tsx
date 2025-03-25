import React, { PropsWithChildren } from 'react'
import PopupWrapper from '../PopupWrapper'
import s from './ChatPopup.module.scss'

interface ChatPopupProps extends PropsWithChildren {
  styles: React.CSSProperties;
    closePopup: () => void;
}

const ChatPopup:React.FC<ChatPopupProps> = ({closePopup,children,styles}) => {
  return (
    <PopupWrapper className={s.chatPopup} closePopup={closePopup} styles={styles}>
        <div className={s.chatPopup_content}>
   {children}
        </div>
  </PopupWrapper>
  )
}

export default ChatPopup