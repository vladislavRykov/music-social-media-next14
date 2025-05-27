import React from 'react';
import FavMusicGenres from './FavMusicGenres/FavMusicGenres';
type Props = {
  faveGenresResponce:
    | {
        ok: boolean;
        data: null;
        message: string;
      }
    | {
        ok: boolean;
        data: {
          genres: Genre[];
        };
        message: string;
      };
};
const RightBlock = ({ faveGenresResponce }: Props) => {
  return (
    <div>
      <FavMusicGenres
        data={faveGenresResponce.data}
        isOk={faveGenresResponce.ok}
        message={faveGenresResponce.message}
      />
    </div>
  );
};

export default RightBlock;
