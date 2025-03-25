'use client';
import Link from 'next/link';
import React from 'react';
import s from './HeaderLinks.module.scss';
import cn from 'classnames';
import { usePathname } from 'next/navigation';

interface HeaderLinkProps {
  title: string;
  href: string|null;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ href, title }) => {
  const pathname = usePathname();
  const isLinkActive = pathname === href;
  return (
    <div className={s.wrapper}>
      <Link  className={cn(s.link, { [s.active_link]: isLinkActive,[s.loading_link]: !href})} href={href||''}>
        {title}
      </Link>
    </div>
  );
};

export default HeaderLink;
