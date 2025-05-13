'use client';
import { orderFilters } from '@/components/PostsPage/PostFilters/orderFilters';
import PostFilters from '@/components/PostsPage/PostFilters/PostFilters';
import PostList from '@/components/PostsPage/PostList/PostList';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useParams, usePathname } from 'next/navigation';
import React, { useState } from 'react';

const Posts = () => {
  const [selectedOrder, setSelectedOrder] = useState(orderFilters[0]);
  const params:{nickname: string}|null
 = useParams()
  const currentUsername = useAppSelector(state=>state.userReducer.user?.username)
  const isPostsAuthor = currentUsername === params?.nickname
  const selectOrderFunction = (filter: { title: string; value: string }) => {
    setSelectedOrder(filter);
    const targetElement = document.getElementById('profile-nav');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div>
      <PostFilters isPostsAuthor={isPostsAuthor} selectedOrder={selectedOrder} setSelectedOrder={selectOrderFunction} />
      <PostList isPostsAuthor={isPostsAuthor} selectedSortOrder={selectedOrder} />
    </div>
  );
};

export default Posts;
