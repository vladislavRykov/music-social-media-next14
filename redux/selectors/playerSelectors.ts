import { createSelector } from 'reselect';
import { RootState } from '../store';

export const selectCurrentAudio = (state: RootState) => state.playerReducer.selectedAudio;
export const selectIsPlaying = (state: RootState) => state.playerReducer.isPlaying;
export const selectIsPlayerLoading = (state: RootState) => state.playerReducer.isLoading;
export const selectAudioVolume = (state: RootState) => state.playerReducer.volume;
export const selectCurrentTime = (state: RootState) => state.playerReducer.currentTime;
export const selectShowPlayer = (state: RootState) => state.playerReducer.showPlayer;
export const selectPlaylist = (state: RootState) => state.playerReducer.playlist;
export const selectPlayerState = (state: RootState) => state.playerReducer;

export const selectMusicitemData = createSelector(
  [selectCurrentAudio, selectIsPlaying, selectIsPlayerLoading],
  (selectedAudio, isPlaying, isLoading) => ({
    selectedAudio,
    isPlaying,
    isPlayerLoading: isLoading,
  }),
);
export const selectPlayerData = createSelector(selectPlayerState, (state) => ({
  musicData: state.selectedAudio,
  isPlaying: state.isPlaying,
  audioVolume: state.volume,
  currentTime: state.currentTime,
  showPlayer: state.showPlayer,
  playlist: state.playlist,
  isPlayerLoading: state.isLoading,
}));
export const selectPlayerPlaylist = createSelector(selectPlayerState, (state) => ({
  musicData: state.selectedAudio,
  playlist: state.playlist,
  isPlayerLoading: state.isLoading,
  isPlaying: state.isPlaying,
}));

