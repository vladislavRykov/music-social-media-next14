import { Schema, model, models } from 'mongoose';

const EventAttendanceSchema = new Schema(
  {
    eventId: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['going', 'interested', 'not_going'],
      default: 'interested',
    },
  },
  {
    timestamps: true,
  },
);

EventAttendanceSchema.index({ eventId: 1, user: 1 }, { unique: true });

export default models?.EventAttendance || model('EventAttendance', EventAttendanceSchema);
