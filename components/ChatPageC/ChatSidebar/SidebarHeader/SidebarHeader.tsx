import React, { useState } from 'react'
import s from './SidebarHeader.module.scss'
import { IoIosSearch } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import IconBtn from '@/components/UI/Buttons/IconBtn';

type Props = {
  isPopupOpen: boolean,
  setIsPopupOpen: (value:boolean) => void,
  setSearchValue: (value:string) => void,
  searchValue: string
}

const SidebarHeader = ({isPopupOpen,setIsPopupOpen,setSearchValue,searchValue}:Props) => {

const onBackArrowClick = ()=>{
  setSearchValue('')
  setIsPopupOpen(false)
}

  return (
    <div className={s.sidebarHeader}>
      {isPopupOpen && <IconBtn onClick={onBackArrowClick}>
        <FaArrowLeft size={25} className={s.sidebarHeader_backArrow}/>
      </IconBtn>}

      <div className={s.sidebarHeader_searchInput}>
      <IoIosSearch size={25} className={s.sidebarHeader_icon}/>
      <input placeholder='Поиск...' onClick={()=>{
        setIsPopupOpen(true)

      }
      } className={s.sidebarHeader_input} value={searchValue} onChange={e=>setSearchValue(e.target.value)}/>
      </div>
    </div>
  )
}

export default SidebarHeader