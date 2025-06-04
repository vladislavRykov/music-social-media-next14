import React, { useState } from 'react'
import s from './ChatSearchPopup.module.scss'
import ChatUserSearch from './ChatUserSearch/ChatUserSearch'
import ChatSearchPopupNav from './ChatSearchPopupNav/ChatSearchPopupNav'
import ChatDialogSearch from './ChatDialogSearch/ChatDialogSearch'

type Props = {
  searchValue: string,
  closePopup: ()=>void,
}

export enum SearchTargets{
  Users = 'users',
  Chats='chats',
}

const ChatSearchPopup = ({searchValue,closePopup}:Props) => {
const [searchTarget,setSearchTarget] = useState<SearchTargets>(SearchTargets.Chats)
  return (
    <div className={s.chatSearchPopup}>
      <ChatSearchPopupNav searchTarget={searchTarget} setSearchTarget={(value: SearchTargets)=>setSearchTarget(value)}/>
    {searchTarget ===SearchTargets.Users && <ChatUserSearch closePopup={closePopup} searchValue={searchValue}/>}
    {searchTarget ===SearchTargets.Chats && <ChatDialogSearch  searchValue={searchValue}/>}
    </div>
  )
}

export default ChatSearchPopup