import SecondaryModal from '@/components/UI/Modals/SecondaryModal/SecondaryModal';
import React, { useState } from 'react';
import { AccessType, Overwrite } from '@/types/common';
import InnerEditPlaylist from '../../ModalInners/InnerEditPlaylist/InnerEditPlaylist';
import { PlaylistData } from '@/types/playlistTypes';
import { MusicData, UserDataMongoose } from '@/types/types';

type EditPlaylistModalProps = {
  closeModal: () => void;
  playlistData: {
    playlistId: string;
    title: string;
    desc: string;
    access_type: AccessType;
  };
  updatePlaylistData:() => void;
};

const EditPlaylistModal: React.FC<EditPlaylistModalProps> = ({
  closeModal,
  playlistData,
  updatePlaylistData,
}) => {
  return (
    <SecondaryModal closeModal={closeModal}>
      <InnerEditPlaylist
        updatePlaylistData={updatePlaylistData}
        closeModal={closeModal}
        playlistData={playlistData}
      />
    </SecondaryModal>
  );
};

export default EditPlaylistModal;
