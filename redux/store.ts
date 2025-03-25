import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import musicFiltersReducer from './slices/MusicFilters';
import playerReducer from './slices/PlayerSlice';

export const makeStore = () => {
  return configureStore({
    reducer: { userReducer: userReducer, musicFiltersReducer, playerReducer },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
