import { mongooseConnect } from '@/lib/mongoose';
import { Schema, model, models } from 'mongoose';
import { Models } from './models';

const RelationshipSchema = new Schema(
  {
    userA: { type: Schema.Types.ObjectId, ref: 'User' },
    userB: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['friends', 'blocked'], default: 'friends' },
  },
  {
    timestamps: true,
  },
);

RelationshipSchema.index({ userA: 1, userB: 1 }, { unique: true });
RelationshipSchema.pre('save', async function (next) {
  const members = [this?.userA?.toString(), this?.userB?.toString()];
  try {
    await mongooseConnect();
    const chat = await Models.Chat.findOne({
      type: 'dialog',
      members: { $all: members },
    });
    if (chat) {
      chat.relation = this._id;
      await chat.save();
    }

    next();
  } catch (error) {
    next(error);
  }
});
export default models?.Relationship || model('Relationship', RelationshipSchema);
