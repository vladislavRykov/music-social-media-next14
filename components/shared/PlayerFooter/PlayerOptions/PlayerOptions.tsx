'use client';
import React, { useEffect, useState } from 'react';
import s from './PlayerOptions.module.scss';
import IconBtn from '@/components/UI/Buttons/IconBtn';
import { BsRepeat } from 'react-icons/bs';
import { BsRepeat1 } from 'react-icons/bs';
import { LuVolume2 } from 'react-icons/lu';
import { BsShuffle } from 'react-icons/bs';
import { LuVolumeX } from 'react-icons/lu';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setLoop, setVolume } from '@/redux/slices/PlayerSlice';
import cn from 'classnames';

const PlayerOptions = ({
  audioVolume,
  isPlayerHovered,
  loop,
}: {
  audioVolume: number;
  isPlayerHovered: boolean;
  loop: boolean;
}) => {
  console.log(loop)
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
              style={{ width: `${((audioVolume * 100) / 20) * 100}%` }}>
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
              max={20}
              min={0}
              type="range"
              value={audioVolume * 100}
              onChange={(e) => dispatch(setVolume(+e.target.value / 100))}
            />
          </>
        )}
      </div>
      <LuVolume2 onMouseEnter={() => setShowInput(true)} className={s.playerOptions_btn} />
      <BsRepeat
        onClick={() => dispatch(setLoop(!loop))}
        className={s.playerOptions_btn}
        style={loop ? { color: '#fff' } : {}}
      />
      <BsShuffle className={s.playerOptions_btn} />
    </div>
  );
};

export default PlayerOptions;
