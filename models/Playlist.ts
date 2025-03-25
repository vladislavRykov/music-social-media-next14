import { Schema, model, models } from 'mongoose';

const PlaylistSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'user-created' // 'user-created' | 'favorites' | 'saved'
    },
    playlistImg: {
      type: String,
      required: false,

    },
    description: {
      type: String,
      required: false,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    items: {
      type: [Schema.Types.ObjectId],
      ref: 'Music',
      default: [],
    },
    access_type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default models?.Playlist || model('Playlist', PlaylistSchema);
