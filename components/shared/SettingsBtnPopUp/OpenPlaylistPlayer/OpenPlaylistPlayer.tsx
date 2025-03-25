import React from 'react'
import DeafultItem from '../DeafultItem/DeafultItem'
import { MdOutlinePlaylistPlay } from "react-icons/md";

const OpenPlaylistPlayer = ({openPlayer}:{openPlayer:()=>void}) => {
  return (
    <DeafultItem title='Включить этот плейлист' Icon={MdOutlinePlaylistPlay} action={openPlayer}/>
  )
}

export default OpenPlaylistPlayer