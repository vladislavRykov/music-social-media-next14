export enum EventAttendanceStatus {
  Going = 'going',
  Interested = 'interested',
  Not_going = 'not_going',
}
export type GroupedEventsT = {
  [EventAttendanceStatus.Going]: string[];
  [EventAttendanceStatus.Interested]: string[];
  [EventAttendanceStatus.Not_going]: string[];
};
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
