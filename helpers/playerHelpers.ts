export const getNextSongId = (playlist: string[], currentId: string) => {
  const index = playlist.indexOf(currentId);
  const nextSongId = playlist[index === playlist.length - 1 ? 0 : index + 1];
  return nextSongId;
};
export const getPrevSongId = (playlist: string[], currentId: string) => {
  const index = playlist.indexOf(currentId);
  const nextSongId = playlist[index === 0 ? playlist.length - 1 : index - 1];
  return nextSongId;
};
