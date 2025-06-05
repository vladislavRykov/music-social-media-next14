import { findAllCurrentUserChatsAction } from '@/actions/chat';
import {
  ChatItemDateStringType,
  ChatItemType,
  ChatMongooseT,
  MessageWithAuthor,
} from '@/types/chatTypes';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export const getCurrentUserChatsThunk = createAsyncThunk(
  'chats/getCurrentUserChats',
  async (_, thunkAPI) => {
    const res = await findAllCurrentUserChatsAction();
    if (!res.ok) {
      return thunkAPI.rejectWithValue(res.message || 'Unknown error');
    }
    const data: ChatItemDateStringType[] | null =
      res.data &&
      res.data.map((chat) => ({
        ...chat,
        createdAt: chat.createdAt.toISOString(),
        updatedAt: chat.updatedAt.toISOString(),
        lastMessage: chat.lastMessage && {
          ...chat.lastMessage,
          createdAt: chat.lastMessage.createdAt.toISOString(),
          updatedAt: chat.lastMessage.updatedAt.toISOString(),
        },
        relation: chat.relation && {
          ...chat.relation,
          createdAt: chat.relation.createdAt.toISOString(),
          updatedAt: chat.relation.updatedAt.toISOString(),
        },
      }));
    return data;
  },
);
export const getCurrentUserChatsNoLoaderThunk = createAsyncThunk(
  'chats/getCurrentUserChatsNoLoader',
  async (_, thunkAPI) => {
    const res = await findAllCurrentUserChatsAction();
    if (!res.ok) {
      return thunkAPI.rejectWithValue(res.message || 'Unknown error');
    }
    const data: ChatItemDateStringType[] | null =
      res.data &&
      res.data.map((chat) => ({
        ...chat,
        createdAt: chat.createdAt.toISOString(),
        updatedAt: chat.updatedAt.toISOString(),
        lastMessage: chat.lastMessage && {
          ...chat.lastMessage,
          createdAt: chat.lastMessage.createdAt.toISOString(),
          updatedAt: chat.lastMessage.updatedAt.toISOString(),
        },
        relation: chat.relation && {
          ...chat.relation,
          createdAt: chat.relation.createdAt.toISOString(),
          updatedAt: chat.relation.updatedAt.toISOString(),
        },
      }));
    return data;
  },
);

interface ChatsSliceFields {
  chats: ChatItemDateStringType[] | null;
  errorMessage: string | null;
  isLoading: boolean;
}

const initialState: ChatsSliceFields = {
  chats: null,
  isLoading: true,
  errorMessage: null,
};

export const playerSlice = createSlice({
  name: 'chatsSlice',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<ChatItemDateStringType[] | null>) => {
      state.chats = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getCurrentUserChatsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chats = action.payload;
      state.errorMessage = null;
    }),
      builder.addCase(getCurrentUserChatsThunk.pending, (state, action) => {
        state.isLoading = true;
      });
    builder.addCase(getCurrentUserChatsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message || null;
    });
    builder.addCase(getCurrentUserChatsNoLoaderThunk.fulfilled, (state, action) => {
      state.chats = action.payload;
    });
  },
});

export const { setChats } = playerSlice.actions;

export default playerSlice.reducer;
