'use client';
import React, { useEffect, useRef, useState } from 'react';
import s from './ProfileMenu.module.scss';
import { getMenuLinks } from './profileLinks';
import ProfileLink from './ProfileLink';
import { IoTriangleSharp } from 'react-icons/io5';
import cn from 'classnames';
import { delay } from '@/utils/delay';
import { IoMdLogOut } from 'react-icons/io';
import { signOut } from 'next-auth/react';
import API from '@/services/api/api';
import { logout } from '@/actions/auth';
// import { useRouter } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { clearUser, setLocation } from '@/redux/slices/UserSlice';
import { useAppDispatch } from '@/hooks/reduxHooks';

interface ProfileMenuProps {
  isShown: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string | undefined;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ isShown, setIsHovered, userName }) => {
  const dispatch = useAppDispatch()
  const [animate, setAnimate] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

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

  const logoutHandler = async () => {
    await logout();
    dispatch(clearUser())
    dispatch(setLocation(null))
    router.push('/login');
  };
  return (
    <div
      onMouseOut={() => setIsHovered(false)}
      onMouseOver={() => setIsHovered(true)}
      className={cn(s.wrapper, { [s.wrapper_opened]: animate })}>
      <div className={s.invisibleBlock}></div>
      <div className={s.menu}>
        {getMenuLinks(userName || '').map((link) => (
          <ProfileLink key={link.href} {...link} />
        ))}
        <div className={s.logout} onClick={logoutHandler}>
          <IoMdLogOut size={19} />
          <span>Выход</span>
        </div>
        <IoTriangleSharp color="white" className={s.menu_triangle} />
      </div>
    </div>
  );
};

export default ProfileMenu;
