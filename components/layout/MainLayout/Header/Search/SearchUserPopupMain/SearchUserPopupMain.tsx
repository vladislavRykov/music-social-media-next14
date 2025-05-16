import { searchUsersByUsernameA } from '@/actions/user';
import { useDebounce } from '@/hooks/hooks';
import { useAsync, useLoading } from '@/hooks/useFetching';
import useScrollPagination from '@/hooks/useScrollPagination';
import { UserProfileData } from '@/types/types';
import React, { useEffect, useRef, useState } from 'react';
import s from './SearchUserPopupMain.module.scss';
import SearchUserItem from '../SearchUserItem/SearchUserItem';
import Image from 'next/image';
import circleTube from '@/public/circleTube.svg';

const SearchUserPopupMain = () => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue);
  const loadMoreItems = useRef(true);
  const [users, setUsers] = useState<UserProfileData[]>([]);

  const searchUsers = async (searchString: string, users: UserProfileData[]) => {
    const postLimit = 4;
    if (!loadMoreItems.current) return;
    const lastPostId = users.length > 0 ? users[users.length - 1]._id : null;
    const result = await searchUsersByUsernameA({ searchValue: searchString, lastPostId });
    if (!result.ok || !result.data) return;
    setUsers((prev) => [...prev, ...result.data]);
    if (result.data.length < postLimit) loadMoreItems.current = false; // закончились посты
  };

  const [searchUsersLoading, isLoading] = useLoading(searchUsers);
  console.log(users);
  useEffect(() => {
    const firstLoad = async () => {
      loadMoreItems.current = true;
      setUsers([]);
      searchUsersLoading(debouncedValue, []);
    };
    firstLoad();
  }, [debouncedValue]); // Перезагрузка при изменении slug или free-flag
  const refObserver = useScrollPagination({
    loadMoreCallback: () => searchUsersLoading(debouncedValue, users),
    threshold: 100, // подгружаем, когда расстояние до конца страницы меньше 100 пикселей
    scrollDeps: [users, debouncedValue],
  });
  return (
    <div className={s.wrapper}>
      <div className={s.input_wrapper}>
        <input
          className={s.input}
          placeholder="Введите ник пользователя"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className={s.content}>
        <div className={s.useritems}>
          {users.map((user) => (
            <SearchUserItem {...user} />
          ))}
          {users.map((user) => (
            <SearchUserItem {...user} />
          ))}
          {users.map((user) => (
            <SearchUserItem {...user} />
          ))}
          {users.map((user) => (
            <SearchUserItem {...user} />
          ))}
          {users.map((user) => (
            <SearchUserItem {...user} />
          ))}
          {users.map((user) => (
            <SearchUserItem {...user} />
          ))}
          {users.map((user) => (
            <SearchUserItem {...user} />
          ))}
          {users.map((user) => (
            <SearchUserItem {...user} />
          ))}
          {users.map((user) => (
            <SearchUserItem {...user} />
          ))}
          {users.map((user) => (
            <SearchUserItem {...user} />
          ))}
          {isLoading && (
            <div className={s.listLoader}>
              <Image src={circleTube} alt="loading" fill />
            </div>
          )}
          <div ref={refObserver}></div>
        </div>
      </div>
    </div>
  );
};

export default SearchUserPopupMain;
