import {
  addItemsToPlaylist,
  createPlaylist,
  getPlaylistByType,
  removeItemsToPlaylist,
} from '@/dal/playlist';
import { AccessType } from '@/types/common';
import { PlaylistData } from '@/types/playlistTypes';
import { Schema, model, models } from 'mongoose';

const ReactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  targetId: { type: Schema.Types.ObjectId, required: true }, // ID поста/трека
  targetType: {
    type: String,
    enum: ['Post', 'Music'],
    required: true,
  },
  reactionType: {
    type: String,
    enum: ['like', 'dislike'], // Добавляем типы реакций
    required: true,
  },
});
ReactionSchema.index({ user: 1, targetId: 1, targetType: 1 }, { unique: true });

ReactionSchema.pre('save', async function (next) {
  if (this.targetType === 'Post') return next();
  try {
    if (this.reactionType === 'dislike') return next();
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
        playlistImg:
          'https://firebasestorage.googleapis.com/v0/b/file-storage-c3276.appspot.com/o/images%2FfavSongsImg.png?alt=media&token=ee32a942-d6dc-41c8-9dfb-b3c01e45bda9',
        items: [this.targetId.toString()],
        type: 'favorites',
      });
    } else {
      const playlistUpdated = await addItemsToPlaylist(favPlaylist._id, [this.targetId.toString()]);
    }

    next();
  } catch (error) {
    next(error);
  }
});
ReactionSchema.post('findOneAndUpdate', async function (doc, next) {
  //  console.log('3213131',doc,'ggregregreg')
  if (doc.targetType === 'Post') return next();
  try {
    const favPlaylist = await getPlaylistByType<PlaylistData>({
      userId: doc.userId.toString(),
      type: 'favorites',
    });
    if (!favPlaylist) {
      if (doc.reactionType === 'dislike') return next();
      const newFavPlaylist = await createPlaylist({
        userId: doc.userId.toString(),
        title: 'Понравившаяся музыка',
        description:
          'В этот плейлист попадают треки, которым вы поставили отметку "Нравится". Изменить параметры плейлиста можно в настройках.',
        access_type: AccessType.Public,
        items: [doc.targetId.toString()],
        type: 'favorites',
      });
    } else {
      if (doc.reactionType === 'like') {
        const playlistUpdated = await addItemsToPlaylist(favPlaylist._id, [
          doc.targetId.toString(),
        ]);
      } else {
        const updatedPlaylist = await removeItemsToPlaylist(favPlaylist._id, [
          doc.targetId.toString(),
        ]);
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});
ReactionSchema.post('findOneAndDelete', async function (doc, next) {
  //  console.log('3213131',doc,'ggregregreg')
  if (doc.targetType === 'Post') return next();
  try {
    const favPlaylist = await getPlaylistByType<PlaylistData>({
      userId: doc.userId.toString(),
      type: 'favorites',
    });
    if (doc.reactionType === 'dislike') {
      return next();
    } else if (favPlaylist) {
      const updatedPlaylist = await removeItemsToPlaylist(favPlaylist._id, [
        doc.targetId.toString(),
      ]);
    }
    next();
  } catch (error) {
    next(error);
  }
});

export default models?.Reaction || model('Reaction', ReactionSchema);
