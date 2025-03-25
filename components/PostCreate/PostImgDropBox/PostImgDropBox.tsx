'use client'
import React, { useState } from 'react'
import s from './PostImgDropBox.module.scss'
import Image from 'next/image'
import { IoIosClose } from "react-icons/io";
import { BsUpload } from "react-icons/bs";

const PostImgDropBox = () => {
    const [previewUrl,setPreviewUrl] = useState<string|null>(null)
    const onChangeHandlerF:React.ChangeEventHandler<HTMLInputElement> = (e)=>{
        const file = e.target.files?.[0];
        if(!file){
            return
        }
        
     const reader = new FileReader();

    reader.onloadend = () => {
        typeof reader.result === 'string'  &&   setPreviewUrl(reader.result);
    }

    reader.readAsDataURL(file);
    }
  return (
    <div className={s.postImgDropBox}>
        {!previewUrl ?<div className={s.postImgDropBox_inputWrapper}>
         <input
                     type="file"
                      multiple={false}
                            accept="image/png, image/jpeg"
                            className={s.postImgDropBox_input}
                            onChange={onChangeHandlerF}
                />
                <div className={s.postImgDropBox_dropboxText}>
                    <BsUpload size={31} className={s.postImgDropBox_dropboxIcon}/>
                <span>Добавить фото</span>
                </div>


        </div>:
        <div className={s.postImgDropBox_preview}>
            <Image className={s.postImgDropBox_previewImg} src={previewUrl} alt="Preview" fill />
            <IoIosClose size={22} onClick={()=>setPreviewUrl(null)} className={s.postImgDropBox_removeImage}/>
        </div>
    }

    </div>
  )
}

export default PostImgDropBox