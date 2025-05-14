'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import mockPostImg from '@/public/profCap.jpg';
import PostItem from '../PostItem/PostItem';
import s from './PostList.module.scss';
import { useAsync, useLoading } from '@/hooks/useFetching';
import { useParams } from 'next/navigation';
import { findAllPostsByUsername } from '@/actions/post';
import { MongoosePost } from '@/types/postTypes';
import useScrollPagination from '@/hooks/useScrollPagination';
import Image from 'next/image';
import cicleTube from '@/public/circleTube.svg';

type Props = {
  isPostsAuthor: boolean;
  selectedSortOrder: {
    title: string;
    value: string;
  };
};

const PostList = ({ selectedSortOrder,isPostsAuthor }: Props) => {
  const params: { nickname: string } | null = useParams();
  const loadMoreItems = useRef(true);
  const [posts, setPosts] = useState<MongoosePost[]>([]);

  const getPostsByUsername = async (sortType: string, posts: MongoosePost[]) => {
    const postLimit = 4;
    if (!loadMoreItems.current) return;
    const lastPostId = posts.length > 0 ? posts[posts.length - 1]._id : null;
    console.log(params);
    console.log(posts);
    if (!params) return;
    const res = await findAllPostsByUsername({
      username: params?.nickname,
      sortType,
      lastPostId,
      limit: postLimit,
    });
    if (!res.ok || !res.data) return;
    setPosts((prev) => [...prev, ...res.data]);
    if (res.data.length < postLimit) loadMoreItems.current = false; // закончились посты
  };

  //     const {data:posts,status,error,execute}=useAsync(getPostsByUsername,[params?.nickname])
  //      const sortedPosts = posts && posts.sort((a, b) => {
  //         if(selectedSortOrder.value==='DESC'){
  //             return +new Date(b.createdAt) - (+new Date(a.createdAt));

  //         }else{
  //             return +new Date(a.createdAt) - (+new Date(b.createdAt));
  //         }
  // });
  const [getPostsByUsernameLoading, isLoading] = useLoading(getPostsByUsername);
  // const {execute,status,data,error} = useAsync(getEvents,[isOnlyFreeEvents,location?.slug])

  useEffect(() => {
    loadMoreItems.current = true;
    setPosts([]);
  }, [selectedSortOrder.value]); // Перезагрузка при изменении slug или free-flag
  const refObserver = useScrollPagination({
    loadMoreCallback: () => getPostsByUsernameLoading(selectedSortOrder.value, posts),
    threshold: 100, // подгружаем, когда расстояние до конца страницы меньше 100 пикселей
    commonDeps: [selectedSortOrder.value],
    scrollDeps: [posts]
  });
  // useEffect(() => {
  //   const targetElement = document.getElementById('profile-nav');
  //   console.log(targetElement);
  //   if (targetElement) {
  //     targetElement.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [selectedSortOrder.value]);

  return (
    <div className={s.postList} style={isLoading ? { height: '100vh' } : {}}>
      {posts.length === 0 && !isLoading && <div className={s.noPosts}>Пусто</div>}
      {posts.map((post) => (
        <PostItem  key={post._id} {...post} isPostsAuthor={isPostsAuthor}/>
      ))}
      {isLoading && (
        <div style={{ textAlign: 'center' }}>
          <Image src={cicleTube} height={50} width={50} alt="Loading..." />
        </div>
      )}
      <div ref={refObserver}></div>
    </div>
  );
};

export default PostList;
