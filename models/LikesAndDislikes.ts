import {
  addItemsToPlaylist,
  createPlaylist,
  getPlaylistByType,
  removeItemsToPlaylist,
} from '@/dal/playlist';
import { AccessType } from '@/types/common';
import { PlaylistData } from '@/types/playlistTypes';
import { Schema, model, models } from 'mongoose';

const LikesAndDislikesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  songId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Music',
  },
  type: {
    type: String, // 'like' or 'dislike'
    required: true,
  },
});

LikesAndDislikesSchema.pre('save', async function (next) {
  try {
    if (this.type === 'dislike') return next();
    const favPlaylist = await getPlaylistByType<PlaylistData>({
      userId: this.userId.toString(),
      type: 'favorites',
    });
    if (!favPlaylist) {
      const newFavPlaylist = await createPlaylist({
        userId: this.userId.toString(),
        title: 'Понравившаяся музыка',
        description:
          'В этот плейлист попадают треки, которым вы поставили отметку "Нравится". Изменить параметры плейлиста можно в настройках.',
        access_type: AccessType.Private,
        playlistImg: 'https://firebasestorage.googleapis.com/v0/b/file-storage-c3276.appspot.com/o/images%2FfavSongsImg.png?alt=media&token=ee32a942-d6dc-41c8-9dfb-b3c01e45bda9',
        items: [this.songId.toString()],
        type: 'favorites',
      });
    } else {
      const playlistUpdated = await addItemsToPlaylist(favPlaylist._id, [this.songId.toString()]);
    }

    next();
  } catch (error) {
    next(error);
  }
});
LikesAndDislikesSchema.post('findOneAndUpdate', async function (doc, next) {
  //  console.log('3213131',doc,'ggregregreg')
  try {
    const favPlaylist = await getPlaylistByType<PlaylistData>({
      userId: doc.userId,
      type: 'favorites',
    });
    if (!favPlaylist) {
      if (doc.type === 'dislike') return next();
      const newFavPlaylist = await createPlaylist({
        userId: doc.userId,
        title: 'Понравившаяся музыка',
        description:
          'В этот плейлист попадают треки, которым вы поставили отметку "Нравится". Изменить параметры плейлиста можно в настройках.',
        access_type: AccessType.Public,
        items: [doc.songId],
        type: 'favorites',
      });
    } else {
      if (doc.type === 'like') {
        const playlistUpdated = await addItemsToPlaylist(favPlaylist._id, [doc.songId]);
      } else {
        const updatedPlaylist = await removeItemsToPlaylist(favPlaylist._id, [doc.songId]);
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});
LikesAndDislikesSchema.post('findOneAndDelete', async function (doc, next) {
  //  console.log('3213131',doc,'ggregregreg')

  try {
    const favPlaylist = await getPlaylistByType<PlaylistData>({
      userId: doc.userId,
      type: 'favorites',
    });
    if (doc.type === 'dislike') {
      return next();
    } else if (favPlaylist) {
      const updatedPlaylist = await removeItemsToPlaylist(favPlaylist._id, [doc.songId]);
    }
    next();
  } catch (error) {
    next(error);
  }
});

export default models?.LikesAndDislikes || model('LikesAndDislikes', LikesAndDislikesSchema);
