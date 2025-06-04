import React from 'react'
import s from './ChatSearchPopupNav.module.scss'
import { SearchTargets } from '../ChatSearchPopup'
import cn from 'classnames'

type Props = {
    setSearchTarget: (value: SearchTargets )=>void,
    searchTarget: SearchTargets,
}
const ChatSearchPopupNav = ({searchTarget,setSearchTarget}:Props) => {
    const targets:{label: string,value:SearchTargets}[] = [
        {value:SearchTargets.Chats,label: 'Чаты'} ,
        {value:SearchTargets.Users,label: 'Друзья'},
    ]
        
  return (
    <div className={s.chatSearchPopupNav}>
        {targets.map(target=><div style={{width: `${100/targets.length}%`}} className={cn(s.chatSearchPopupNav_option,{[s.chatSearchPopupNav_selectedOption]:searchTarget ===target.value})} onClick={()=>setSearchTarget(target.value)}>

            {target.label}
           {searchTarget ===target.value && <div className={s.chatSearchPopupNav_platform}></div>}
        </div>)}
    </div>
  )
}

export default ChatSearchPopupNav