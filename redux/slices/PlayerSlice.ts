import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import { MusicData, MusicDataWithReactionT, UserMainFields } from '@/types/types';
import { getUserMainFields } from '@/dal/user';
import { getMusicById } from '@/dal/music';
import { string } from 'yup';
import { getPlaylistById } from '@/dal/playlist';
import { PlaylistData } from '@/types/playlistTypes';
import { shuffleArray } from '@/utils/ArrayFunctions';
import { getMusicByIdA } from '@/actions/music';
import { ItemReactionStatus } from '@/types/likeAndDislikes';

export const setMusicData = createAsyncThunk(
  'player/getMusicData',
  async (musicId: string, thunkAPI) => {
    const res = await getMusicByIdA(musicId);
    console.log(res.data);
    return res.data;
  },
);
export const setPlaylistData = createAsyncThunk(
  'player/setPlaylistData',
  async ({ playlistId, shuffle = false }: { playlistId: string; shuffle?: boolean }, thunkAPI) => {
    const res = await getPlaylistById<PlaylistData>(playlistId);
    const items: string[] | undefined = shuffle && res ? shuffleArray(res.items) : res?.items;
    return { items: items || [], _id: res?._id || null, type: res?.type || null };
  },
);

interface MusicFiltersFields {
  playlist: {
    _id: string | null;
    items: string[];
    type: string | null;
  };
  currentTime: number;
  volume: number;
  loop: boolean;
  isPlaying: boolean;
  selectedAudio: MusicDataWithReactionT | null;
  isLoading: boolean;
  errorMessage: null | any;
  showPlayer: boolean;
}

const initialState: MusicFiltersFields = {
  showPlayer: false,
  playlist: {
    _id: null,
    items: [],
    type: null,
  },
  currentTime: 0,
  volume: 0.05,
  loop: false,
  isPlaying: true,
  selectedAudio: null,
  isLoading: true,
  errorMessage: null,
};

export const playerSlice = createSlice({
  name: 'playerSlice',
  initialState,
  reducers: {
    setAudio: (state, action: PayloadAction<MusicDataWithReactionT | null>) => {
      state.selectedAudio = action.payload;
    },
    setLoop: (state, action: PayloadAction<boolean>) => {
      state.loop = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setPlaylist: (
      state,
      action: PayloadAction<{
        _id: string | null;
        items: string[];
        type: string | null;
      }>,
    ) => {
      state.playlist = action.payload;
    },
    setPlaylistItems: (state, action: PayloadAction<string[]>) => {
      state.playlist.items = action.payload;
    },
    clearPlayer: (state) => {
      state.showPlayer = false;
      (state.playlist = {
        _id: null,
        items: [],
        type: null,
      }),
        (state.currentTime = 0);
      state.loop = false;
      state.isPlaying = true;
      state.selectedAudio = null;
      state.isLoading = true;
      state.errorMessage = null;
    },
    changeSelectedMusicReaction: (state, action: PayloadAction<ItemReactionStatus>) => {
      if (state.selectedAudio) {
        state.selectedAudio.reactionStatus = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(setMusicData.fulfilled, (state, action) => {
      state.selectedAudio = action.payload;
      state.isLoading = false;
      state.errorMessage = null;
      state.loop = false;
      state.isPlaying = true;
      state.showPlayer = true;
      state.currentTime = 0;
    }),
      builder.addCase(setMusicData.pending, (state, action) => {
        state.isLoading = true;
      });
    builder.addCase(setMusicData.rejected, (state, action) => {
      state.selectedAudio = null;
      state.isLoading = false;
      state.errorMessage = action.error.message || null;
    });
    builder.addCase(setPlaylistData.fulfilled, (state, action) => {
      state.playlist = action.payload;
    }),
      builder.addCase(setPlaylistData.pending, (state, action) => {
        // state.isLoading = true;
      });
    builder.addCase(setPlaylistData.rejected, (state, action) => {
      state.playlist = {
        _id: null,
        items: [],
        type: null,
      };
      // state.isLoading = false;
    });
  },
});

export const {
  setAudio,
  setLoop,
  setIsPlaying,
  setCurrentTime,
  setVolume,
  setPlaylist,
  clearPlayer,
  setPlaylistItems,
  changeSelectedMusicReaction,
} = playerSlice.actions;

export default playerSlice.reducer;
