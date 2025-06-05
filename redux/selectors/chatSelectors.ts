import { createSelector } from 'reselect';
import { RootState } from '../store';

export const selectChatsSlice = (state: RootState) => state.chatsReducer;
export const selectChats = (state: RootState) => state.chatsReducer.chats;

export const chatsDataSelector = createSelector(selectChatsSlice, (chatReducer) => ({
  chats: chatReducer.chats,
  isLoading: chatReducer.isLoading,
  errorMessage: chatReducer.errorMessage,
}));
