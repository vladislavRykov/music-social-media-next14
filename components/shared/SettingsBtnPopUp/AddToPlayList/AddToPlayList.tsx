'use client';
import React, { useState } from 'react';
import DeafultItem from '../DeafultItem/DeafultItem';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import PlaylistActionModal from '../../Modals/PlaylistActionModal/PlaylistActionModal';

const AddToPlayList = ({ selectedItems }: { selectedItems: string[] }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <DeafultItem
        title="Добавить в плейлист"
        Icon={MdOutlinePlaylistAdd}
        action={() => setOpenModal(true)}
      />
      {openModal && (
        <PlaylistActionModal selectedItems={selectedItems} closeModal={() => setOpenModal(false)} />
      )}
    </>
  );
};

export default AddToPlayList;
