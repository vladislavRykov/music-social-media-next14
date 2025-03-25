import { Schema, model, models } from 'mongoose';

const TokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default models?.Token || model('Token', TokenSchema);
