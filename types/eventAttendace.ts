export enum EventAttendanceStatus {
  Going = 'going',
  ItemsPlaylistDatanterested = 'interested',
  Not_going = 'not_going',
}
export interface EventAttendanceT {
  event: string;
  user: { type: Schema.Types.ObjectId; ref: 'User'; required: true };
  status: {
    type: String;
    enum: ['going', 'interested', 'not_going'];
    default: 'interested';
  };
  createdAt: { type: Date; default: Date.now };
}
