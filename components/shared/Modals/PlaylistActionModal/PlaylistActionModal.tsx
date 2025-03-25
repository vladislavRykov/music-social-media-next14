import SecondaryModal from '@/components/UI/Modals/SecondaryModal/SecondaryModal';
import React, { useState } from 'react';
import InnerPlaylistActions from '../../ModalInners/InnerPlaylistActions/InnerPlaylistActions';
import InnerNewPlaylistCreateForm from '../../ModalInners/InnerNewPlaylistCreateForm/InnerNewPlaylistCreateForm';

type PlaylistActionModalProps = {
  closeModal: () => void;
  selectedItems: string[];
};

const PlaylistActionModal: React.FC<PlaylistActionModalProps> = ({ closeModal, selectedItems }) => {
  const [isCreatingNewPlaylist, setIsCreatingNewPlaylist] = useState(false);
  return (
    <SecondaryModal closeModal={closeModal}>
      {isCreatingNewPlaylist ? (
        <InnerNewPlaylistCreateForm
          selectedItems={selectedItems}
          goBack={() => setIsCreatingNewPlaylist(false)}
        />
      ) : (
        <InnerPlaylistActions
          closeModal={closeModal}
          selectedItems={selectedItems}
          goToCreatePlaylist={() => setIsCreatingNewPlaylist(true)}
        />
      )}
    </SecondaryModal>
  );
};

export default PlaylistActionModal;
