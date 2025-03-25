'use client'
import React from 'react'
import s from './ChatUserSearch.module.scss'
import { searchUsersByUsername } from '@/dal/user'
import { UserProfileData } from '@/types/types'
import { useAsync } from '@/hooks/useFetching'
import ChatUserItem from './ChatUserItem/ChatUserItem'
import LoadingSvg from '@/public/circleTube.svg'
import Image from 'next/image'
import { useDebounce } from '@/hooks/hooks'

type Props = {
    searchValue: string,
    closePopup: ()=>void,
  }

const ChatUserSearch = ({searchValue,closePopup}:Props) => {

    const debouncedValue =  useDebounce(searchValue)
    const searchUser = async()=>{
        try {
            
            const result:UserProfileData[]|null = await searchUsersByUsername(debouncedValue,10,1,['avatar','username','_id'])
    
            return result
        } catch (error) {
            console.log(123,error)
            return null
        }
        
    }

    const {execute,status,data,error} = useAsync(searchUser,[debouncedValue])
    console.log(searchValue,data)
  return (
    <div className={s.chatUserSearch}>
      {status === 'pending' && <Image src={LoadingSvg} alt='loading...' height={100} width={100}/>}
      {status === 'success' && data && 
       data.map(user=><ChatUserItem key={user._id} {...user} closePopup={closePopup} />)
      }
    </div>
  )
}

export default ChatUserSearch