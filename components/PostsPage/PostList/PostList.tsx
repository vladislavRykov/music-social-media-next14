'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import mockPostImg from '@/public/profCap.jpg';
import PostItem from '../PostItem/PostItem';
import s from './PostList.module.scss';
import { useAsync, useLoading } from '@/hooks/useFetching';
import { useParams } from 'next/navigation';
import { findAllPostsByUsername, searchPostsByUsernameA, searchPostsFriendsA, searchPostsLikedA } from '@/actions/post';
import { MongoosePost, MongoosePostReactionT } from '@/types/postTypes';
import useScrollPagination from '@/hooks/useScrollPagination';
import Image from 'next/image';
import cicleTube from '@/public/circleTube.svg';
import PostItemLoader from '@/components/UI/Loaders/PostItemLoader';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useDebounce } from '@/hooks/hooks';

type Props = {
  isPostsAuthor: boolean;
  searchString: string;
  selectedSortOrder: {
    title: string;
    value: string;
  };
};

const PostList = ({ selectedSortOrder, isPostsAuthor ,searchString}: Props) => {
  const params: { nickname: string } | null = useParams();
    const currentUserName =
      useAppSelector(state=>state.userReducer.user?.username);
    const isCurrentUserProfile = Boolean(
      currentUserName && params && params.nickname === currentUserName,
    );
  const loadMoreItems = useRef(true);
  const [posts, setPosts] = useState<MongoosePostReactionT[]>([]);
  const debouncedSearchString = useDebounce(searchString)

  const getPostsByUsername = async (sortType: string, posts: MongoosePostReactionT[],searchString:string) => {
    const postLimit = 4;
    if (!loadMoreItems.current) return;
    const lastPostId = posts.length > 0 ? posts[posts.length - 1]._id : null;
    if (!params) return;
    // const res = await searchPostsLikedA({
    //   searchString,
    //   // username: params?.nickname,
    //   sortType,
    //   lastPostId,
    //   limit: postLimit,
    // });
    const res = await searchPostsFriendsA({
      searchString,
      // username: params?.nickname,
      sortType,
      lastPostId,
      limit: postLimit,
    });
    // const res = await searchPostsByUsernameA({
    //   searchString,
    //   username: params?.nickname,
    //   sortType,
    //   lastPostId,
    //   limit: postLimit,
    // });
    if (!res.ok || !res.data) return;
    setPosts((prev) => [...prev, ...res.data]);
    if (res.data.length < postLimit) loadMoreItems.current = false; // закончились посты
  };

  const [getPostsByUsernameLoading, isLoading] = useLoading(getPostsByUsername);

  useEffect(() => {
    const firstLoad = async () => {
      loadMoreItems.current = true;
      setPosts([]);
      await getPostsByUsernameLoading(selectedSortOrder.value, [],debouncedSearchString);
    };
    firstLoad();
  }, [selectedSortOrder.value,debouncedSearchString]); // Перезагрузка при изменении slug или free-flag
  const refObserver = useScrollPagination({
    loadMoreCallback: () => getPostsByUsernameLoading(selectedSortOrder.value, posts,debouncedSearchString),
    threshold: 100, // подгружаем, когда расстояние до конца страницы меньше 100 пикселей
    scrollDeps: [posts, selectedSortOrder.value,debouncedSearchString],
  });

  return (
    <div className={s.postList}>
      {posts.length === 0 && !isLoading && <div className={s.noPosts}>
        {isCurrentUserProfile
        ?
        'Тут отображаются ваши посты. Попробуйте создать новый пост по кнопке выше.'
        :
        'У пользователя нет постов.'
        }
        
        </div>}
      {posts.map((post) => (
        <PostItem key={post._id} {...post} isPostsAuthor={isPostsAuthor} />
      ))}
      {isLoading &&
        Array(8)
          .fill(0)
          .map((_, idx) => (
            <div>
              <PostItemLoader key={idx} />
            </div>
          ))}
      <div ref={refObserver}></div>
    </div>
  );
};

export default PostList;
