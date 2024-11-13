import React from 'react';
import HeaderLink from './HeaderLink';
import s from './HeaderLinks.module.scss';

interface HeaderLinksProps {
  links: {
    title: string;
    href: string;
  }[];
}

const HeaderLinks: React.FC<HeaderLinksProps> = ({ links }) => {
  return (
    <nav className={s.navigation}>
      {links.map((link) => (
        <HeaderLink key={link.href} {...link} />
      ))}
    </nav>
  );
};

export default HeaderLinks;
