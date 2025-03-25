import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { Genre, UserMainFields } from '@/types/types';
import { getUserMainFields } from '@/dal/user';

// export const getUserProfile = createAsyncThunk('user/getUserProfile', async (userId, thunkAPI) => {
//   const res = await getUserMainFields();

//   return res as UserMainFields | null;
// });

interface MusicFiltersFields {
  search: string;
  genres: { label: string; value: string }[];
  year: { label: string; value: string }[];
  season: { label: string; value: string }[];
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: MusicFiltersFields = {
  search: '',
  genres: [],
  year: [],
  season: [],
  isLoading: true,
  errorMessage: null,
};

export const musicFiltersSlice = createSlice({
  name: 'musicFilters',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    addGenre: (state, action: PayloadAction<{ label: string; value: string }>) => {
      state.genres.push(action.payload);
    },
    removeGenre: (state, action: PayloadAction<string>) => {
      state.genres = state.genres.filter((genre) => genre.value !== action.payload);
    },
    clearGenres: (state) => {
      state.genres = [];
    },
    setYear: (state, action: PayloadAction<{ label: string; value: string }[]>) => {
      state.year = action.payload;
    },
    setSeason: (state, action: PayloadAction<{ label: string; value: string }[]>) => {
      state.season = action.payload;
    },
    clearAllFilters: (state) => {
      state.search = '';
      state.genres = [];
      state.year = [];
      state.season = [];
    },
  },
  // extraReducers: (builder) => {
  //   // Add reducers for additional action types here, and handle loading state as needed
  //   builder.addCase(getUserProfile.fulfilled, (state, action) => {
  //     state.user = action.payload;
  //     state.isLoading = false;
  //     state.errorMessage = null;
  //   }),
  //     builder.addCase(getUserProfile.pending, (state, action) => {
  //       state.isLoading = true;
  //     });
  //   builder.addCase(getUserProfile.rejected, (state, action) => {
  //     state.user = null;
  //     state.isLoading = false;
  //     state.errorMessage = action.error.message || null;
  //   });
  // },
});

export const {
  setSearch,
  addGenre,
  removeGenre,
  setYear,
  setSeason,
  clearGenres,
  clearAllFilters,
} = musicFiltersSlice.actions;

export default musicFiltersSlice.reducer;
