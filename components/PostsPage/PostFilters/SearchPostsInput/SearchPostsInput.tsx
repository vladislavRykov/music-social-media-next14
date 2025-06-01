import React from 'react'
import s from './SearchPostsInput.module.scss'

type Props = {
  setSearchString: (value: string)=>void;
  searchString: string;
};

const SearchPostsInput = ({setSearchString,searchString}:Props) => {
  return (
    <div className={s.searchPostsInput}>
         <input placeholder='Поиск...' className={s.searchPostsInput_input} value={searchString} onChange={(e)=>setSearchString(e.target.value)}/>
    </div>
  )
}

export default SearchPostsInput