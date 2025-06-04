import { Event, EventWithATStatus } from '@/types/kudaGo';
import React from 'react';
import s from './EventItem.module.scss';
import Image from 'next/image';
import { FaRubleSign } from 'react-icons/fa';
import Link from 'next/link';
import EventStatusMark from '../EventStatusMark/EventStatusMark';

const EventItem = (props: EventWithATStatus) => {
  return (
    <div className={s.eventItem}>
      <div className={s.eventItem_imageWrap}>
        <a style={{position: 'absolute',height: '100%',width: '100%'}} target="_blank" href={props.site_url} rel="noopener noreferrer">
          <Image
            className={s.eventItem_image}
            fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="/background/lightModeImgPlaceholder.svg"
            src={props.images[0].image}
            alt="event img"
          />
        </a>
        <EventStatusMark currentUserEventStatus={props.currentUserATStatus} eventId={props.id.toString()} />
      </div>

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
