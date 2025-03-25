import React, { useEffect, useState } from 'react';
import { PiMicrophone } from 'react-icons/pi';
import s from './AudioRecorder.module.scss';
import { IoMdSend } from 'react-icons/io';
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { storage } from '@/firebase/firebase';
import { getDownloadURL, ref, StorageError, uploadBytesResumable } from 'firebase/storage';
import { createUniqueName } from '@/utils/createUniqueName';
import { deleteOneImg } from '@/actions/files';
import { sendAudioMessageAction, sendMessageAction } from '@/actions/message';
import { ChatMessageT, MessageTypes } from '@/types/messageT';
import { v4 as uuidv4 } from 'uuid';

type  Props={
  startTimer: () => void;
   stopTimer: () => void;
   chatId:string;
   addNewMessage: (data: ChatMessageT) => void;
   currentUserData:{
    _id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    isAdmin: boolean;
    avatar?: string;
    banner?: string;
    aboutMe?: string;
} | null
}

const AudioRecorder = ({chatId,startTimer,stopTimer,addNewMessage,currentUserData}:Props) => {
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioFile, setAudioFile] = useState<File|null>(null);
    const [audioSrc, setAudioSrc] = useState<string|null>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [shouldSend, setShouldSend] = useState<boolean>(true);

    const sendAudioMessage =async ()=>{
      if(!currentUserData || !audioSrc)return
      const token = uuidv4()

        addNewMessage({
        _id: token,
         isCurrentUserMessage: true,
         type: MessageTypes.Voice,
            chat: chatId,
            unread: true,
            voiceSrc: audioSrc,
            attachments: null,
            updatedAt: new Date(),
            createdAt: new Date(),
            author: {
              _id: currentUserData._id,
              username: currentUserData.username,
              avatar: currentUserData.avatar,
              banner: currentUserData.banner,
            },
      })
    // console.log(audioFile)
                  if (!audioFile) {
                    return toast.error('Нет файла');
                  }
        
              
                  try {
                    const audioRef = ref(storage, `audioMessages/${createUniqueName(audioFile)}`);
                    const uploadTask = uploadBytesResumable(audioRef, audioFile);
                    const fileUrl = new Promise<StorageError | string>((resolve, reject) => {
                      uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                          console.log('Upload is ' + progress + '% done');
                        },
                        (error) => {
                          console.error('Error uploading file: ', error);
                          reject(error);
                        },
                        async () => {
                          const url = await getDownloadURL(audioRef);
                          console.log('File uploaded successfully: ' + url);
                          resolve(url);
                        },
                      );
                    });
                    const payload = await fileUrl;
                    if (payload instanceof StorageError) {
                      return toast.error('Ошибка при обработки аудио сообщения');
                    }
                  //   dispatch(changeUserFields({ avatar: payload as string }));
                  
                       const res = await sendAudioMessageAction({voiceSrc: payload,chat:chatId })

      
                  } catch (error) {
                    if (error instanceof Error) {
                      return toast.error(error.message);
                    }
                    return toast.error('Неизвестная ошибка');
                  }
              
              
    }
    useEffect(()=>{
      if(!audioFile)return
      if(shouldSend){
        console.log('sending',audioFile)
        sendAudioMessage()
      }else{
        
        console.log('cancled')
      }
      setAudioFile(null)
      

    },[shouldSend,audioFile])

    const onError = (error: any) => {
      console.log(error);
    };
    const onStop = () => {
      console.log('stop')
      mediaRecorder?.stop();
      setIsRecording(false);
      setShouldSend(true)
    };
    const onCancel = () => {
      console.log('cancel')
      mediaRecorder?.stop();
      setIsRecording(false);
      setShouldSend(false)
    };
    const onSuccess = (stream: any) => {
      setIsRecording(true);
      startTimer()
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
  
      recorder.start();
      recorder.onstop = (e) => {
      stopTimer()

        console.log('Recorder stopped  ', e);
        
      };
      recorder.ondataavailable = (e) => {
        const dataUrl = window.URL.createObjectURL(e.data);
        setAudioSrc(dataUrl)
        const blob = e.data;
    
        // Преобразуем Blob в File
        const file = new File([blob], 'audio.mp3', { type: 'audio/mp3' });
        
        console.log('ondataavailable', file);
        setAudioFile(file);
      
      };
    };
    const getMicroAccess = () => {
      if (navigator.mediaDevices) {
        const constraints = { audio: true };
        navigator.mediaDevices.getUserMedia(constraints).then(onSuccess).catch(onError);
      }
    };
  return (
    <div className={s.audioRecorder}>
      {!isRecording ?<div onClick={getMicroAccess} className={s.audioRecorder_btn+' '+s.audioRecorder_recordBtn}>
        <PiMicrophone className={s.audioRecorder_recordIcon} size={22} />
      </div>:
        <div className={s.audioRecorder_recordingBtns}>
        {isRecording && <div onClick={onCancel} className={s.audioRecorder_btn+' '+s.audioRecorder_cancelBtn}>
        <FaRegTrashCan className={s.audioRecorder_cancelIcon} size={22} />
      </div>}
        <div onClick={onStop} className={s.audioRecorder_btn+' '+s.audioRecorder_sendBtn}>
        <IoMdSend className={s.audioRecorder_sendIcon} size={22} />
      </div>
        </div>
      }
    </div>
  );
};

export default AudioRecorder;
