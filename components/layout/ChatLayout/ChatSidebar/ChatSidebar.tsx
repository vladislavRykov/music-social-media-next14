'use client'
import React, { useEffect, useRef, useState } from 'react'
import s from './ChatSidebar.module.scss'
import ChatList from './ChatList/ChatList'
import SidebarHeader from './SidebarHeader/SidebarHeader'
import ChatSearchPopup from './ChatSearchPopup/ChatSearchPopup'
import { UserProfileData } from '@/types/types'
import { MessageWithAuthor } from '@/types/chatTypes'
import { RelationMongooseT } from '@/types/relationT'
import { findAllCurrentUserChatsAction } from '@/actions/chat'
import { useAsync } from '@/hooks/useFetching'



const ChatSidebar = () => {
  const sideBarRef = useRef<HTMLDivElement|null>(null);
  const rightResizer = useRef<HTMLDivElement|null>(null);
  const [isSearchPopupOpen,setIsSearchPopupOpen] = useState(false)
  const [searchValue,setSearchValue] = useState('')

  useEffect(() => {
    const resizeableEl = sideBarRef.current
    if(!resizeableEl)return
    const styles = window.getComputedStyle(resizeableEl)
    let width = parseInt(styles.width,10)

    let xCord =0;

    const onMouseMoveResize = (e:MouseEvent)=>{
      const dx = e.clientX - xCord
      width = width+dx
      xCord=e.clientX
      resizeableEl.style.width = `${width}px`
    }
    const onMouseUpResize = ()=>{
        document.removeEventListener('mousemove',onMouseMoveResize)
      }
    const onMouseDownResize = (e:MouseEvent)=>{
    xCord = e.clientX
    resizeableEl.style.left = styles.left
    resizeableEl.style.right = null
    document.addEventListener('mousemove',onMouseMoveResize)
    document.addEventListener('mouseup',onMouseUpResize)
  }
  const resizerRightEl =  rightResizer.current
  resizerRightEl?.addEventListener('mousedown',onMouseDownResize)
  
  return ()=>{
    
    resizerRightEl?.removeEventListener('mousedown',onMouseDownResize)
}
  }, []);


  return (
    <div ref={sideBarRef} className={s.chatSidebar} >
      <SidebarHeader searchValue={searchValue} setSearchValue={(value:string)=>setSearchValue(value)}  isPopupOpen={isSearchPopupOpen} setIsPopupOpen={(value:boolean)=>setIsSearchPopupOpen(value)}/>
      <div className={s.chatSidebar_main}>
      {!isSearchPopupOpen && <ChatList/>}
      {isSearchPopupOpen && <ChatSearchPopup closePopup={()=>setIsSearchPopupOpen(false)} searchValue={searchValue}/>}
      </div>
      <div ref={rightResizer}  className={s.chatSidebar_resize}></div>
    </div>
  )
}

export default ChatSidebar