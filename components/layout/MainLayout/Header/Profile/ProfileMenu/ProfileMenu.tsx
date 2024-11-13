'use client';
import React, { useEffect, useRef, useState } from 'react';
import s from './ProfileMenu.module.scss';
import { menuLinks } from './profileLinks';
import ProfileLink from './ProfileLink';
import { IoTriangleSharp } from 'react-icons/io5';
import cn from 'classnames';
import { delay } from '@/utils/delay';
import { IoMdLogOut } from 'react-icons/io';

interface ProfileMenuProps {
  isShown: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ isShown, setIsHovered }) => {
  const [animate, setAnimate] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  console.log({ isShown: isShown, animate: animate, menuOpen: menuOpen });

  useEffect(() => {
    if (isShown && !menuOpen) {
      setMenuOpen(true);
    } else if (!isShown && menuOpen) {
      setAnimate(false);
      delay(150).then(() => setMenuOpen(false));
    }
  }, [isShown, menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      setAnimate(true);
    }
  }, [menuOpen]);

  if (!menuOpen) {
    return <></>;
  }
  return (
    <div
      onMouseOut={() => setIsHovered(false)}
      onMouseOver={() => setIsHovered(true)}
      className={cn(s.wrapper, { [s.wrapper_opened]: animate })}>
      <div className={s.invisibleBlock}></div>
      <div className={s.menu}>
        {menuLinks.map((link) => (
          <ProfileLink {...link} />
        ))}
        <div className={s.logout}>
          <IoMdLogOut size={19} />
          <span>Выход</span>
        </div>
        <IoTriangleSharp color="white" className={s.menu_triangle} />
      </div>
    </div>
  );
};

export default ProfileMenu;
