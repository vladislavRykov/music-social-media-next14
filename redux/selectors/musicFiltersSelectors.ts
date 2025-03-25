import { createSelector } from 'reselect';
import { RootState } from '../store';

export const selectSearch = (state: RootState) => state.musicFiltersReducer.search;
export const selectGenres = (state: RootState) => state.musicFiltersReducer.genres;
export const selectYear = (state: RootState) => state.musicFiltersReducer.year;
export const selectSeason = (state: RootState) => state.musicFiltersReducer.season;

export const filtersSelectedData = createSelector(
  [selectGenres, selectYear, selectSearch, selectSeason],
  (genres, year, search, season) => ({
    selectedGenres: genres,
    year,
    search,
    season,
  }),
);
