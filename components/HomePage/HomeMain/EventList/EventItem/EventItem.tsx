import { Event } from '@/types/kudaGo';
import React from 'react';
import s from './EventItem.module.scss';
import Image from 'next/image';
import { FaRubleSign } from 'react-icons/fa';
import Link from 'next/link';

const EventItem = (props: Event) => {
  return (
    <div className={s.eventItem}>
      <a target="_blank" href={props.site_url} rel="noopener noreferrer">
        <div className={s.eventItem_imageWrap}>
          <Image
            className={s.eventItem_image}
            fill
            placeholder="blur"
            blurDataURL="/background/lightModeImgPlaceholder.svg"
            src={props.images[0].image}
            alt="event img"
          />
        </div>
      </a>

      <div className={s.eventItem_info}>
        <h2 className={s.eventItem_title}>
          <a target="_blank" href={props.site_url} rel="noopener noreferrer">
            <span>{props.title}</span>
          </a>
        </h2>
        <p className={s.eventItem_desc} dangerouslySetInnerHTML={{ __html: props.description }} />
        {props.price && (
          <div className={s.eventItem_price}>
            <FaRubleSign className={s.eventItem_price_sign} size={22} />
            <span>{props.price}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventItem;
