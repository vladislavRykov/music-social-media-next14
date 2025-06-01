'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import mockPostImg from '@/public/profCap.jpg';
import PostItem from '../PostItem/PostItem';
import s from './PostList.module.scss';
import { useAsync, useLoading } from '@/hooks/useFetching';
import { useParams, useSearchParams } from 'next/navigation';
import {
  findAllPostsByUsername,
  searchPostsByUsernameA,
  searchPostsFriendsA,
  searchPostsLikedA,
} from '@/actions/post';
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
};

const PostList = ({ isPostsAuthor, searchString }: Props) => {
  const params: { nickname: string } | null = useParams();
  const searchParams = useSearchParams()
  const selectedSortOrder = searchParams?.get('sort')
  const selectedPostsType = searchParams?.get('postsType')
  const currentUserId = useAppSelector((state) => state.userReducer.user?._id);
  const loadMoreItems = useRef(true);
  const [posts, setPosts] = useState<MongoosePostReactionT[]>([]);
  const debouncedSearchString = useDebounce(searchString);

  const getPostsByUsername = async (
    sortType: string,
    selectedSortOrderValue: string,
    posts: MongoosePostReactionT[],
    searchString: string,
  ) => {
    const postLimit = 4;
    if (!loadMoreItems.current) return;
    const lastPostId = posts.length > 0 ? posts[posts.length - 1]._id : null;
    if (!params) return;
    let res:
      | {
          ok: boolean;
          data: MongoosePostReactionT[];
          message: string;
        }
      | {
          ok: boolean;
          data: null;
          message: string;
        };
    if (selectedSortOrderValue === 'user-posts') {
      res = await searchPostsByUsernameA({
        searchString,
        username: params?.nickname,
        sortType,
        lastPostId,
        limit: postLimit,
      });
    } else if (selectedSortOrderValue === 'user-fav-posts') {
      res = await searchPostsLikedA({
        searchString,
        // username: params?.nickname,
        sortType,
        lastPostId,
        limit: postLimit,
      });
    } else {
      res = await searchPostsFriendsA({
        searchString,
        // username: params?.nickname,
        sortType,
        lastPostId,
        limit: postLimit,
      });
    }
    if (!res.ok || !res.data) return;
    setPosts((prev) => [...prev, ...res.data]);
    if (res.data.length < postLimit) loadMoreItems.current = false; // закончились посты
  };

  const [getPostsByUsernameLoading, isLoading] = useLoading(getPostsByUsername);

  useEffect(() => {
    const firstLoad = async () => {
      loadMoreItems.current = true;
      setPosts([]);
      await getPostsByUsernameLoading(selectedSortOrder,selectedPostsType, [], debouncedSearchString);
    };
    firstLoad();
  }, [selectedSortOrder,selectedPostsType, debouncedSearchString]); // Перезагрузка при изменении slug или free-flag
  const refObserver = useScrollPagination({
    loadMoreCallback: () =>
      getPostsByUsernameLoading(selectedSortOrder,selectedPostsType, posts, debouncedSearchString),
    threshold: 100, // подгружаем, когда расстояние до конца страницы меньше 100 пикселей
    scrollDeps: [posts, selectedSortOrder,selectedPostsType, debouncedSearchString],
  });

  return (
    <div className={s.postList}>
      {posts.length === 0 && !isLoading && (
        <div className={s.noPosts}>
          {isPostsAuthor
            ? 'Посты не найдены.'
            : 'Посты пользователя не найдены.'}
        </div>
      )}
      {posts.map((post) => (
        <PostItem key={post._id} {...post} isPostsAuthor={post.author.toString()===currentUserId?.toString()} />
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
