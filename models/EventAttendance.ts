import { Schema, model, models } from 'mongoose';

const EventAttendanceSchema = new Schema({
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['going', 'interested', 'not_going'], 
    default: 'interested' 
  },
  createdAt: { type: Date, default: Date.now }
});

export default models?.EventAttendance || model('EventAttendance', EventAttendanceSchema);