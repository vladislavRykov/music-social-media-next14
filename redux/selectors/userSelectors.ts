import { createSelector } from 'reselect';
import { RootState } from '../store';

export const selectLoading = (state: RootState) => state.userReducer.isLoading; // Селектор для всего объекта
export const selectUser = (state: RootState) => state.userReducer.user; // Селектор для всего объекта

export const userSelectedData = createSelector([selectLoading, selectUser], (isLoading, user) => ({
  isLoading,
  userAva: user?.avatar,
  userName: user?.username,
}));
export const selectUserProfileData = createSelector( selectUser, ( user) => ({
  userAva: user?.avatar,
  userName: user?.username,
  userBanner: user?.banner,
  userId: user?._id,
}));
export const selectEmailVerify = createSelector([selectLoading, selectUser], (isLoading, user) => ({
  isLoading,
  userEmail: user?.email,
}));
