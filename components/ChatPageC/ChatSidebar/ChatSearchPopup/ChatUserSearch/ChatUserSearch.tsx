'use client';
import React, { useEffect, useRef, useState } from 'react';
import s from './ChatUserSearch.module.scss';
import { searchUsersByUsername } from '@/dal/user';
import { UserProfileData } from '@/types/types';
import { useAsync, useLoading } from '@/hooks/useFetching';
import ChatUserItem from './ChatUserItem/ChatUserItem';
import LoadingSvg from '@/public/circleTube.svg';
import Image from 'next/image';
import { useDebounce } from '@/hooks/hooks';
import { searchCurrentUserFriends } from '@/actions/relations';
import useScrollPagination from '@/hooks/useScrollPagination';

type Props = {
  searchValue: string;
  closePopup: () => void;
};

const ChatUserSearch = ({ searchValue, closePopup }: Props) => {
  const loadMoreItems = useRef(true);
  const [users, setUsers] = useState<UserProfileData[]>([]);
  const debouncedValue = useDebounce(searchValue);
  const searchUser = async (searchString: string, users: UserProfileData[]) => {
    const userLimit = 8;
    try {
      if (!loadMoreItems.current) return;
      const lastUserId = users.length > 0 ? users[users.length - 1]._id : null;
      const result = await searchCurrentUserFriends(searchString, lastUserId, userLimit);

      if (!result.ok || !result.data) return;
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
  return (
    <div ref={elementWithScroll} className={s.chatUserSearch}>
      {isLoading && <Image src={LoadingSvg} alt="loading..." height={100} width={100} />}
      {!isLoading &&
        users.length > 0 &&
        users.map((user) => <ChatUserItem key={user._id} {...user} closePopup={closePopup} />)}
      {!isLoading && users.length === 0 && <div>Нет друзей</div>}
      <div ref={refObserver}></div>
    </div>
  );
};

export default ChatUserSearch;
