export interface PlaylistData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  title: string;
  description: string;
  items: string[];
  access_type: string;
  hidden: boolean;
  type: string;
  playlistImg?: string;
}

export interface UserPlaylistData {
  username: string;
  _id: string;
  avatar: string;
}
export interface ItemsPlaylistData {
  image: string;
  _id: string;
}
export interface LibraryPlaylistData extends ItemsPlaylistData {
  songPath: string;
}
