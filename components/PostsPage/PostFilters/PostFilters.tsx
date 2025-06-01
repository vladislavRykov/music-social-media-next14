import React from 'react';
import OldestNewestSelector from './PostFilterSelector/PostFilterSelector';
import s from './PostFilters.module.scss';
import Link from 'next/link';
import { orderFilters, whosPostsOptions } from './filtersOptions';
import PostFilterSelector from './PostFilterSelector/PostFilterSelector';
import SearchPostsInput from './SearchPostsInput/SearchPostsInput';

type Props = {
  setSearchString: (value: string) => void;
  searchString: string;

  isPostsAuthor: boolean;
};

const PostFilters = ({ isPostsAuthor, setSearchString, searchString }: Props) => {
  return (
    <div className={s.postFilters}>
      <div className={s.postFilters_filters}>
        <SearchPostsInput setSearchString={setSearchString} searchString={searchString} />
      {isPostsAuthor && (
        <PostFilterSelector
        orderFilters={whosPostsOptions}
        searchParamsName="postsType"
        defaultFilter={whosPostsOptions[0]}
        />
      )}
      <PostFilterSelector
        orderFilters={orderFilters}
        searchParamsName="sort"
        defaultFilter={orderFilters[0]}
        />
        </div>
      {isPostsAuthor && (
        <Link className={s.postFilters_createNewPost} href={'/post/create'}>
          Создать пост
        </Link>
      )}
    </div>
  );
};

export default PostFilters;
