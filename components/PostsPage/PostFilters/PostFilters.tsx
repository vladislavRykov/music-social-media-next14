import React from 'react';
import OldestNewestSelector from './OldestNewestSelector/OldestNewestSelector';
import s from './PostFilters.module.scss';
import Link from 'next/link';

type Props = {
  selectedOrder: {
    title: string;
    value: string;
  };
  setSelectedOrder: (filter: { title: string; value: string }) => void;
  isPostsAuthor: boolean;
};

const PostFilters = ({ selectedOrder, setSelectedOrder, isPostsAuthor }: Props) => {
  return (
    <div className={s.postFilters}>
      {isPostsAuthor && (
        <Link className={s.postFilters_createNewPost} href={'/post/create'}>
          Создать пост
        </Link>
      )}
      <OldestNewestSelector selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
    </div>
  );
};

export default PostFilters;
