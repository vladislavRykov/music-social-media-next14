'use client';
import React, { useRef, useState } from 'react';
import s from './AudioProgressBar.module.scss';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setCurrentTime } from '@/redux/slices/PlayerSlice';
import { secondsToStringTimer } from '@/utils/secondToStringTimer';
import cn from 'classnames';

interface AudioProgressBarProps {
  duration: number;
  currentTime: number;
  audioRef: React.RefObject<any>;
  isPlayerHovered: boolean;
}

const AudioProgressBar: React.FC<AudioProgressBarProps> = ({
  audioRef,
  duration,
  currentTime,
  isPlayerHovered,
}) => {
  const dispatch = useAppDispatch();
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number } | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const rangeRef = useRef<HTMLInputElement | null>(null);
  const handleMouseMove: React.MouseEventHandler<HTMLInputElement> = (event) => {
    const range = rangeRef.current;
    if (range) {
      const rect = range.getBoundingClientRect();
      const rangeWidth = rect.right - rect.left;
      const relativeX = event.clientX - rect.left;
      const percentage = relativeX / rangeWidth;
      const value = Math.round(percentage * duration);
      setHoverValue(value);
      if (rangeWidth <= event.clientX + 50) return setHoverPosition({ x: rangeWidth - 50 });
      if (event.clientX - 50 <= 0) return setHoverPosition({ x: 50 });

      setHoverPosition({ x: event.clientX });
    }
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };
  return (
    <div className={s.audioProgressBar}>
      {hoverValue !== null && hoverPosition && (
        <div
          className={s.audioProgressBar_onHoverTimer}
          style={{
            width: '60px',
            left: hoverPosition?.x - 30,
            bottom: '100%',
          }}>
          {secondsToStringTimer(hoverValue || 123)}
        </div>
      )}
      <div
        className={s.audioProgressBar_mainLine}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}>
        <div
          className={s.audioProgressBar_progressLine}
          style={{ width: `${(currentTime / duration) * 100}%` }}>
          <div className={s.audioProgressBar_progressLine_thumbWrap}>
            <div
              // className={s.audioProgressBar_progressLine_thumb}
              className={cn(s.audioProgressBar_progressLine_thumb, {
                [s.input_active]: isMouseDown,
              })}
              style={!isPlayerHovered ? { opacity: 0 } : { opacity: 1 }}></div>
          </div>
        </div>
        <div className={s.audioProgressBar_input_line}></div>
        <input
          onMouseDown={() => setIsMouseDown(true)}
          onMouseUp={() => setIsMouseDown(false)}
          ref={rangeRef}
          type="range"
          className={s.audioProgressBar_input}
          max={duration}
          onChange={(e) => {
            if (audioRef.current) audioRef.current.currentTime = Number(e.target.value);
          }}
          value={currentTime >= duration ? duration : currentTime}
        />
      </div>
    </div>
  );
};

export default AudioProgressBar;
