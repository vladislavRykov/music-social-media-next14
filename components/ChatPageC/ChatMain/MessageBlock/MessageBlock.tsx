import React, { useEffect, useState } from 'react';
import s from './MessageBlock.module.scss';
import IconBtn from '@/components/UI/Buttons/IconBtn';
import { IoMdSend } from 'react-icons/io';
import { sendMessageAction } from '@/actions/message';
import { ChatMessageT, MessageTypes } from '@/types/messageT';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectUserProfileData } from '@/redux/selectors/userSelectors';
import { FaRegSmile } from 'react-icons/fa';
import { PiMicrophone } from 'react-icons/pi';
import EmojiPicker from 'emoji-picker-react';
import EmojiPickerBlock from './EmojiPickerBlock/EmojiPickerBlock';
import AudioRecorder from './AudioRecorder/AudioRecorder';
import { v4 as uuidv4 } from 'uuid';
import useRecordingTimer from '@/hooks/hooks';
import { secondsToStringTimer } from '@/utils/secondToStringTimer';
import { RxUpdate } from 'react-icons/rx';
import { useLoading } from '@/hooks/useFetching';
import cn from 'classnames';

type Props = {
  chatId: string;
  addNewMessage: (data: ChatMessageT) => void;
  updateChat: () => Promise<void>;
  isChatLoading: boolean;
};

const MessageBlock = ({ chatId, addNewMessage, updateChat,isChatLoading }: Props) => {
  const currentUserData = useAppSelector((state) => state.userReducer.user);
  const [messageValue, setMessageValue] = useState('');
  const { recordingTime, isTimerActive, startTimer, stopTimer } = useRecordingTimer();



  const onChange = (e: any) => {
    setMessageValue(e.target.value);
    e.target.style.height = '';
    e.target.style.height = e.target.scrollHeight > 500 ? '500px' : e.target.scrollHeight + 'px';
  };

  const sendMessageHandler = async () => {
    if (!currentUserData || !messageValue) return;
    const token = uuidv4();
    addNewMessage({
      _id: token,
      isCurrentUserMessage: true,
      type: MessageTypes.Text,
      text: messageValue,
      chat: chatId,
      unread: true,
      attachments: null,
      updatedAt: new Date(),
      createdAt: new Date(),
      author: {
        _id: currentUserData._id,
        username: currentUserData.username,
        avatar: currentUserData.avatar,
        banner: currentUserData.banner,
      },
    });
    setMessageValue('');
    const res = await sendMessageAction({ text: messageValue, chat: chatId });
  };

  return (
    <div className={s.messageBlock}>
      <div className={s.messageBlock_content}>
        <div
          onClick={updateChat}
          className={s.messageBlock_defBtn + ' ' + s.messageBlock_update}>
          <RxUpdate
            className={cn(s.messageBlock_iconBtn, { [s.messageBlock_iconUpdate]: isChatLoading })}
            size={11}
          />
        </div>
        <div className={s.messageBlock_inputWrapper}>
          <div className={s.messageBlock_emojiPicker}>
            <EmojiPickerBlock
              addEmojiToMessage={(emoji: string) => setMessageValue((message) => message + emoji)}
            />
          </div>
          <textarea
            className={s.messageBlock_textarea}
            rows={1}
            onChange={onChange}
            value={messageValue}
          />

          {/* 
          <InputEmoji 
          // className={s.messageBlock_textarea} 
          // rows={1}
          onEnter={onChange2}
          shouldConvertEmojiToImage
          shouldReturn
           onChange={setMessageValue}
            value={messageValue}/> */}

          {isTimerActive && (
            <div className={s.messageBlock_recordingTimer}>
              <span>{secondsToStringTimer(recordingTime)}</span>
              <div className={s.messageBlock_redDot}></div>
            </div>
          )}
        </div>
        {messageValue ? (
          <div className={s.messageBlock_defBtn} onClick={sendMessageHandler}>
            <IoMdSend
              className={s.messageBlock_iconBtn + ' ' + s.messageBlock_sendIcon}
              size={22}
            />
          </div>
        ) : (
          <AudioRecorder
            currentUserData={currentUserData}
            addNewMessage={addNewMessage}
            startTimer={startTimer}
            stopTimer={stopTimer}
            chatId={chatId}
          />
        )}
      </div>
    </div>
  );
};

export default MessageBlock;
