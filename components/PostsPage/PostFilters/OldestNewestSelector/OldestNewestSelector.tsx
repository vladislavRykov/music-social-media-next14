'use client'
import React, { useState } from 'react'
import s from './OldestNewestSelector.module.scss'
import PopupWrapper from '@/components/shared/Popups/PopupWrapper'
import cn from 'classnames'

const orderFilters = [
    {
        title: 'Сначала новые',
        value: 'DESC'
    },
    {
        title: 'Сначала старые',
        value: 'ASC'
    },
]

const OldestNewestSelector = () => {
    const [selectedOrder,setSelectedOrder] = useState(orderFilters[0])
    const [isFilterSelectOpen,setIsFilterSelectOpen] = useState(false)

        const onOptionClick= (filter:{
            title: string;
            value: string;
        })=>{
            setSelectedOrder(filter)
            setIsFilterSelectOpen(false)
        }

  return (
    <div className={s.oldestNewestSelector}>
        <div onClick={()=>setIsFilterSelectOpen(true)} className={s.oldestNewestSelector_currentOption}>{selectedOrder.title}</div>
        {isFilterSelectOpen && <PopupWrapper styles={{position: 'absolute',left: 0,top: '100%',right: 0}} closePopup={()=>setIsFilterSelectOpen(false)}>

        <ul className={s.oldestNewestSelector_options}>
            {orderFilters.map(filter=>(
                <li className={cn(s.oldestNewestSelector_option,{[s.oldestNewestSelector_selectedOption]:selectedOrder.title===filter.title})} onClick={()=>onOptionClick(filter)}>{filter.title}</li>
            ))}
            
            
            </ul>
        </PopupWrapper> 
            }
    </div>
  )
}

export default OldestNewestSelector