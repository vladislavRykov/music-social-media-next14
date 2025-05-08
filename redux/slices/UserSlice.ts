import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { UserMainFields } from '@/types/types';
import { getUserMainFields } from '@/dal/user';
import { Location } from '@/types/kudaGo';

export const getUserProfile = createAsyncThunk('user/getUserProfile', async (userId, thunkAPI) => {
  const res = await getUserMainFields();
  console.log(res)

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
    location: string|null;
  } | null;
  isLoading: boolean;
  errorMessage: string | null;
  location: Location | null
}

const initialState: UserSliceFields = {
  user: null,
  isLoading: true,
  errorMessage: null,
  location: null
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
    setLocation: (state,action:PayloadAction<Location | null>) => {
      state.location = action.payload;
    },
    setAuthUserLocation: (state,action:PayloadAction<string | null>) => {
      if(state.user){
        state.user.location = action.payload;
      }
    },
    setIsLoading: (state,action:PayloadAction<boolean>) => {
        state.isLoading = action.payload;
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
        state.location= null
      });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.location= null
      state.user = null;
      state.isLoading = false;
      state.errorMessage = action.error.message || null;
    });
  },
});

export const { clearUser, setUser, changeUserFields,setLocation,setAuthUserLocation ,setIsLoading} = userSlice.actions;

export default userSlice.reducer;
