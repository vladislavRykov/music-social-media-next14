import React from 'react';
import OldestNewestSelector from './PostFilterSelector/PostFilterSelector';
import s from './PostFilters.module.scss';
import Link from 'next/link';
import { orderFilters, whosPostsOptions } from './filtersOptions';
import PostFilterSelector from './PostFilterSelector/PostFilterSelector';

type Props = {
  setSearchString: (value: string)=>void;
  searchString: string;
  selectedOrder: {
    title: string;
    value: string;
  };
  setSelectedOrder: (filter: { title: string; value: string }) => void;
   setSelectedWhosPosts: (filter: { title: string; value: string }) => void;
        selectedWhichPosts:{
    title: string;
    value: string;
  };
  isPostsAuthor: boolean;
};

const PostFilters = ({ selectedOrder, setSelectedOrder, isPostsAuthor,setSelectedWhosPosts,selectedWhichPosts,setSearchString,searchString }: Props) => {
  return (
    <div className={s.postFilters}>
      <input value={searchString} onChange={(e)=>setSearchString(e.target.value)}/>
      {isPostsAuthor && (
        <Link className={s.postFilters_createNewPost} href={'/post/create'}>
          Создать пост
        </Link>
      )}
       {isPostsAuthor && (
      <PostFilterSelector
        orderFilters={whosPostsOptions}
        selectedOrder={selectedWhichPosts}
        setSelectedOrder={setSelectedWhosPosts}
      />
         )}
      <PostFilterSelector
        orderFilters={orderFilters}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
      />
    </div>
  );
};

export default PostFilters;
