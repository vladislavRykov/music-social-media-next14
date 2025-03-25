import { Schema, model, models } from 'mongoose';

const GenreSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

export default models?.Genre || model('Genre', GenreSchema);
