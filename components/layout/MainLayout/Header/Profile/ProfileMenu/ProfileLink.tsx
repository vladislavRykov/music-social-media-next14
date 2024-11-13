import React from 'react';
import { IconType } from 'react-icons/lib';
import s from './ProfileMenu.module.scss';
import Link from 'next/link';

interface ProfileLinkProps {
  title: string;
  href: string;
  Icon: IconType;
}

const ProfileLink: React.FC<ProfileLinkProps> = ({ title, href, Icon }) => {
  return (
    <Link href={href} className={s.profLink}>
      <Icon size={19} />
      <span>{title}</span>
    </Link>
  );
};

export default ProfileLink;
