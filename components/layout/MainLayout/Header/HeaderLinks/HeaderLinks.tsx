import React from 'react';
import HeaderLink from './HeaderLink';
import s from './HeaderLinks.module.scss';

interface HeaderLinksProps {
  links: {
    title: string;
    href: string|null;
  }[];
}

const HeaderLinks: React.FC<HeaderLinksProps> = ({ links }) => {
  return (
    <nav className={s.navigation}>
      {links.map((link) => (
        <HeaderLink key={link.title} {...link} />
      ))}
    </nav>
  );
};

export default HeaderLinks;
