import { Schema, model, models } from 'mongoose';

const RelationshipSchema = new Schema(
  {
    userA: { type: Schema.Types.ObjectId, ref: 'User' },
    userB: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['friends', 'blocked'], default: 'friends' },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export default models?.Relationship || model('Relationship', RelationshipSchema);
