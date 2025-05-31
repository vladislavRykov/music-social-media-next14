'use client';
import React, { useEffect, useRef, useState } from 'react';
import s from './FriendList.module.scss';
import { UserProfileData } from '@/types/types';
import useScrollPagination from '@/hooks/useScrollPagination';
import { useLoading } from '@/hooks/useFetching';
import { searchCurrentUserFriends, searchUserFriendsByUsername } from '@/actions/relations';
import { useDebounce } from '@/hooks/hooks';
import { toast } from 'react-toastify';
import FriendListItem from './FriendListItem/FriendListItem';
import circleLoader from '@/public/circleTube.svg';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/hooks/reduxHooks';

const FriendList = () => {
  const params: { nickname: string } | null = useParams();
  const currentUserName = useAppSelector((state) => state.userReducer.user?.username);
  const isCurrentUserProfile = Boolean(
    currentUserName && params && params.nickname === currentUserName,
  );
  const loadMoreItems = useRef(true);
  const [users, setUsers] = useState<UserProfileData[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue);
  const searchUser = async (searchString: string, users: UserProfileData[]) => {
    const userLimit = 8;
    try {
      if (!loadMoreItems.current) return;
      const lastUserId = users.length > 0 ? users[users.length - 1]._id : null;
      if (!params) return;
      const result = await searchUserFriendsByUsername(
        searchString,
        params.nickname,
        lastUserId,
        userLimit,
      );
      // const result = await searchCurrentUserFriends(searchString, lastUserId, userLimit);

      if (!result.ok || !result.data) {
        toast.error(result.message);
        return;
      }
      setUsers((prev) => [...prev, ...result.data]);
      if (result.data.length < userLimit) loadMoreItems.current = false; // закончились посты
    } catch (error) {
      console.log(123, error);
    }
  };
  const [searchUserWithLoading, isLoading] = useLoading(searchUser);
  useEffect(() => {
    const firstLoad = async () => {
      loadMoreItems.current = true;
      setUsers([]);
      searchUserWithLoading(debouncedValue, []);
    };
    firstLoad();
  }, [debouncedValue]); // Перезагрузка при изменении slug или free-flag
  const elementWithScroll = useRef<HTMLDivElement | null>(null);
  const refObserver = useScrollPagination({
    loadMoreCallback: () => searchUserWithLoading(debouncedValue, users),
    threshold: 100, // подгружаем, когда расстояние до конца страницы меньше 100 пикселей
    scrollDeps: [users, debouncedValue],
    elementWithScroll,
  });
  if (!isLoading && users.length === 0) {
    return (
      <div className={s.friendList}>
        <p className={s.friendList_empty}>
          {isCurrentUserProfile
            ? 'Вы пока еще никого не добавили в друзья'
            : 'Пользователь еще никого не добавил в друзья'}
        </p>
      </div>
    );
  }

  return (
    <div className={s.friendList}>
      <div className={s.friendList_inputWrapper}>
        <input
          className={s.friendList_input}
          placeholder="Поиск"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className={s.friendList_list} ref={elementWithScroll}>
        {users.map((user) => (
          <FriendListItem friend={user} />
        ))}
        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src={circleLoader} alt="loading" height={40} width={40} />
          </div>
        )}
        <div ref={refObserver}></div>
      </div>
    </div>
  );
};

export default FriendList;
