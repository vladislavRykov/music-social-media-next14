export const getLinks = (username: string|null) => [
  {
    title: 'Главная страница',
    href: '/home',
  },
  {
    title: 'Чат',
    href: username && '/chat',
  },
  {
    title: 'Профиль',
    // href: `/user/${username}`,
    href: username &&`/user/${username}`,
  },
  {
    title: 'Библиотека',
    // href: `/user/${username}/library`,
    href: username &&`/user/${username}/library`,
  },
  {
    title: 'Поиск',
    href: '/browse',
  },
];
export const unAuthorizedLinks = [
  {
    title: 'Главная страница',
    href: '/home',
  },

  {
    title: 'Поиск',
    href: '/browse',
  },
];
