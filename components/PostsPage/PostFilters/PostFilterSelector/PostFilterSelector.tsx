'use client';
import React, { useState } from 'react';
import s from './PostFilterSelector.module.scss';
import PopupWrapper from '@/components/shared/Popups/PopupWrapper';
import cn from 'classnames';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

type Props = {
  orderFilters: {
    title: string;
    value: string;
  }[];
  searchParamsName: string;
  defaultFilter:  {
    title: string;
    value: string;
  };
};

const PostFilterSelector = ({ defaultFilter,searchParamsName, orderFilters }: Props) => {
  const [isFilterSelectOpen, setIsFilterSelectOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchP = searchParams?.get(searchParamsName)
  const selectedFilter = orderFilters.find(filter=>filter.value===searchP) || defaultFilter

  const onOptionClick = (filter: { title: string; value: string }) => {
    const targetElement = document.getElementById('profile-nav');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    const params = new URLSearchParams(searchParams || '');
    params.set(searchParamsName, filter.value); // добавляем параметр

    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
    setIsFilterSelectOpen(false);
  };

  return (
    <div className={s.oldestNewestSelector}>
      <div
        onClick={() => setIsFilterSelectOpen(true)}
        className={s.oldestNewestSelector_currentOption}>
        {selectedFilter.title}
      </div>
      {isFilterSelectOpen && (
        <PopupWrapper
          styles={{ position: 'absolute', left: 0, top: '100%', right: 0 ,zIndex: 100}}
          closePopup={() => setIsFilterSelectOpen(false)}>
          <ul className={s.oldestNewestSelector_options}>
            {orderFilters.map((filter) => (
              <li
                className={cn(s.oldestNewestSelector_option, {
                  [s.oldestNewestSelector_selectedOption]: selectedFilter.title === filter.title,
                })}
                onClick={() => onOptionClick(filter)}>
                {filter.title}
              </li>
            ))}
          </ul>
        </PopupWrapper>
      )}
    </div>
  );
};

export default PostFilterSelector;
