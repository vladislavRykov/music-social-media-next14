import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { UserMainFields } from '@/types/types';
import { getUserMainFields } from '@/dal/user';

export const getUserProfile = createAsyncThunk('user/getUserProfile', async (userId, thunkAPI) => {
  const res = await getUserMainFields();

  const data = res
    ? {
        ...res,
        createdAt: res.createdAt.toISOString(),
        updatedAt: res.updatedAt.toISOString(),
      }
    : null;
  return data;
});

interface UserSliceFields {
  user: {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    isAdmin: boolean;
    avatar?: string;
    banner?: string;
    aboutMe?: string;
  } | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: UserSliceFields = {
  user: null,
  isLoading: true,
  errorMessage: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserMainFields | null>) => {
      const data = action.payload;

      state.user = data
        ? {
            ...data,
            createdAt: data.createdAt.toISOString(),
            updatedAt: data.updatedAt.toISOString(),
          }
        : null;
    },
    changeUserFields: (state, action) => {
      if (state.user) state.user = { ...state.user, ...action.payload };
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;

      state.isLoading = false;
      state.errorMessage = null;
    }),
      builder.addCase(getUserProfile.pending, (state, action) => {
        state.isLoading = true;
      });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.user = null;
      state.isLoading = false;
      state.errorMessage = action.error.message || null;
    });
  },
});

export const { clearUser, setUser, changeUserFields } = userSlice.actions;

export default userSlice.reducer;
