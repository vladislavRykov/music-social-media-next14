'use client';
import { orderFilters, whosPostsOptions } from '@/components/PostsPage/PostFilters/filtersOptions';
import PostFilters from '@/components/PostsPage/PostFilters/PostFilters';
import PostList from '@/components/PostsPage/PostList/PostList';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import s from './Posts.module.scss';

const Posts = () => {
  const searchParams = useSearchParams();
  const sortF = searchParams?.get('sort');

  const [selectedOrder, setSelectedOrder] = useState(orderFilters[0]);
  const [selectedWhichPosts, setSelectedWhichPosts] = useState(whosPostsOptions[0]);
  const [searchString, setSearchString] = useState('');

  const params: { nickname: string } | null = useParams();
  useEffect(() => {
    const findSort = orderFilters.find((filter) => filter.value === sortF);
    if (sortF && findSort) {
      setSelectedOrder(findSort);
    }
  }, [searchParams]);
  const currentUsername = useAppSelector((state) => state.userReducer.user?.username);
  const isPostsAuthor = currentUsername === params?.nickname;
  const selectOrderFunction = (filter: { title: string; value: string }) => {
    setSelectedOrder(filter);
    const targetElement = document.getElementById('profile-nav');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const selectWhosPostsFunction = (filter: { title: string; value: string }) => {
    setSelectedWhichPosts(filter);
    const targetElement = document.getElementById('profile-nav');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className={s.wrapper}>
      <PostFilters
      setSearchString={(value:string)=>setSearchString(value)}
      searchString={searchString}
        isPostsAuthor={isPostsAuthor}
        selectedOrder={selectedOrder}
        setSelectedOrder={selectOrderFunction}
        setSelectedWhosPosts={selectWhosPostsFunction}
        selectedWhichPosts={selectedWhichPosts}
      />
      <PostList searchString={searchString} isPostsAuthor={isPostsAuthor} selectedSortOrder={selectedOrder} />
    </div>
  );
};

export default Posts;
