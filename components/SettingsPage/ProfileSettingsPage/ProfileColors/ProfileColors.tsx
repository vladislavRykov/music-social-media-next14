'use client';
import React, { useState } from 'react';
import ProfColor from './ProfColor/ProfColor';
import s from './ProfileColors.module.scss';
import { useTextColor } from '@/context/TextColorProvider';
import { Bounce, toast } from 'react-toastify';

const colorsList = ['#3DB4F2', '#C063FF', '#4CCA51', '#EF881A', '#E13333', '#FC9DD6', '#677B94'];

const ProfileColors = () => {
  const { textColor,setTextColor } = useTextColor();
  const onColorClick= (colorHex:string)=>{
    setTextColor(colorHex)
    toast.success('Цвет профиля изменился',{
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      })
  }

  return (
    <div className={s.profColors}>
      {colorsList.map((colorHex) => (
        <ProfColor
          key={colorHex}
          color={colorHex}
          onClick={() => onColorClick(colorHex)}
          selectedColor={textColor}
        />
      ))}
    </div>
  );
};

export default ProfileColors;
