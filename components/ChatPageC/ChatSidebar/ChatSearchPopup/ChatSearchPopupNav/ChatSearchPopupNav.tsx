import React from 'react'
import s from './ChatSearchPopupNav.module.scss'
import { SearchTargets } from '../ChatSearchPopup'

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
        {targets.map(target=><div style={searchTarget ===target.value ?{color:'#3DB4F2',width: `${100/targets.length}%`}:{width: `${100/targets.length}%`}} className={s.chatSearchPopupNav_option} onClick={()=>setSearchTarget(target.value)}>

            {target.label}
           {searchTarget ===target.value && <div className={s.chatSearchPopupNav_platform}></div>}
        </div>)}
    </div>
  )
}

export default ChatSearchPopupNav