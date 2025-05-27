export enum EventAttendanceStatus {
  Going = 'going',
  Interested = 'interested',
  Not_going = 'not_going',
}
export interface EventAttendanceMongooseT {
  _id: string;
  eventId: string;
  user: string;
  status: EventAttendanceStatus;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateEventAttendanceT {
  eventId: string;
  user: string;
  status: EventAttendanceStatus;
}
