import React from 'react';
import musicImg from '@/public/musicImg.jpg';
import MusicItem from '../MusicItem/MusicItem';
import s from './MusicItems.module.scss';

const MusicItems = () => {
  console.log('23131' + 'fwfewf');
  const musicItemsData = [
    {
      title: 'Танец рыцарей',
      author: 'Прокофьев',
      imgSrc: musicImg,
    },
    {
      title: 'Танец рыцарей и других знатных уважаемых и не очень людей',
      author: 'Прокофье21312311231231231в',
      imgSrc: musicImg,
    },
    {
      title: 'Танец рыцарей231231231231231231231',
      author: 'Прокофьев',
      imgSrc: musicImg,
    },
  ];
  return (
    <div className={s.itemList}>
      {musicItemsData.map((item) => (
        <MusicItem key={item.author + item.author} {...item} />
      ))}
    </div>
  );
};

export default MusicItems;
