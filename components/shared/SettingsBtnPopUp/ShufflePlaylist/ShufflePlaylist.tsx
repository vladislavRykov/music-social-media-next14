
import React from 'react'
import DeafultItem from '../DeafultItem/DeafultItem'
import { useRouter } from 'next/navigation'
import { BsShuffle } from 'react-icons/bs'

const ShufflePlaylist = ({playlistId}:{playlistId: string}) => {
    const router = useRouter()
  return (
    <DeafultItem title='Перемешать' Icon={BsShuffle} action={()=> router.push(`/player/playlist?list=${playlistId}&shuffled=true`)}/>
  )
}

export default ShufflePlaylist