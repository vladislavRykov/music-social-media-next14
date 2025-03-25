import { Schema, model, models } from 'mongoose';

const MusicSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  songPath: {
    type: String,
    required: true,
  },
  viewsCount: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  dislikes: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: false,
  },

  season: {
    type: String,
    required: false,
  },
  genres: {
    type: [Schema.Types.ObjectId],
    ref: 'Genre',
    required: true,
  },
});

export default models?.Music || model('Music', MusicSchema);
