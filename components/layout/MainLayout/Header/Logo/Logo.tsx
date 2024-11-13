import Link from 'next/link';
import React from 'react';
import s from './Logo.module.scss';
import logo from '@/public/logo3.jpg';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href={'/chat'}>
      <Image className={s.logo} src={logo} height={40} width={40} alt="logo" />
    </Link>
  );
};

export default Logo;
