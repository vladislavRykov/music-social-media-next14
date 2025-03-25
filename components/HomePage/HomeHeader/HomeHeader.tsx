import Image from 'next/image'
import React from 'react'
import MainPageImage from '@/public/background/main_page_bg.jpg'
import s from './HomeHeader.module.scss'
import { IoIosArrowDown } from "react-icons/io";

type Props = {
         scrollIntoViewOfMain: ()=>void| undefined;
    
}

const HomeHeader = ({scrollIntoViewOfMain}:Props) => {
  return (
    <div className={s.homeHeader}>
        <Image style={{objectFit: 'cover',objectPosition: 'top center'}} src={MainPageImage} fill alt='bg_img'/>
        <div className={s.homeHeader_text}>
            <h2>MusicMates</h2>
            <p>Слушай любимую музыку, делись её с близкими, следи за актуальными событиями в мире музыки</p>
            <button onClick={scrollIntoViewOfMain} className={s.homeHeader_showEvents}>
                <span>
                Посмотреть мероприятия
                </span>
                <IoIosArrowDown size={22}/>
                </button>
        </div>
    </div>
  )
}

export default HomeHeader