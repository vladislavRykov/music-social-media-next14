'use client';
import React, { useEffect, useState } from 'react';
import s from './PlayerOptions.module.scss';
import IconBtn from '@/components/UI/Buttons/IconBtn';
import { BsRepeat } from 'react-icons/bs';
import { BsRepeat1 } from 'react-icons/bs';
import { LuVolume2 } from 'react-icons/lu';
import { BsShuffle } from "react-icons/bs";
import { LuVolumeX } from 'react-icons/lu';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setVolume } from '@/redux/slices/PlayerSlice';
import cn from 'classnames';

const PlayerOptions = ({
  audioVolume,
  isPlayerHovered,
}: {
  audioVolume: number;
  isPlayerHovered: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [showInput, setShowInput] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  useEffect(() => {
    if (!isPlayerHovered) setShowInput(false);
  }, [isPlayerHovered]);
  return (
    <div className={s.playerOptions}>
      <div className={s.playerOptions_inputWrap}>
        {isPlayerHovered && showInput && (
          <>
            <div
              className={s.playerOptions_progressLine}
              style={{ width: `${((audioVolume * 100) / 100) * 100}%` }}>
              <div className={s.playerOptions_progressLine_thumbWrap}>
                <div
                  className={cn(s.playerOptions_progressLine_thumb, {
                    [s.input_active]: isMouseDown,
                  })}></div>
              </div>
            </div>
            <div className={s.playerOptions_volumeInput_line}></div>
            <input
              onMouseDown={() => setIsMouseDown(true)}
              onMouseUp={() => setIsMouseDown(false)}
              className={s.playerOptions_volumeInput}
              max={100}
              min={0}
              type="range"
              value={audioVolume * 100}
              onChange={(e) => dispatch(setVolume(+e.target.value / 100))}
            />
          </>
        )}
      </div>
      <LuVolume2 onMouseEnter={() => setShowInput(true)} className={s.playerOptions_btn} />
      <BsRepeat className={s.playerOptions_btn} />
      <BsShuffle className={s.playerOptions_btn}  />
      {/* <Image className={s.playerOptions_btn} src={MixIcons} alt="mix icon" height={22} width={22} /> */}
    </div>
  );
};

export default PlayerOptions;
