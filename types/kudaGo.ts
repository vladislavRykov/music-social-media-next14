import { EventAttendanceStatus } from "./eventAttendace";

export interface Event {
  title: string;
  slug: string;
  images: { image: string }[];
  dates: { start: number; end: number }[];
  description: string;
  id: number;

  location: { slug: string };
  place: { id: number };

  price: string;
  site_url: string;
  tags: string[];
}
export interface EventWithATStatus extends Event{
  currentUserATStatus: EventAttendanceStatus|null,
}
export interface GetEventDataT {
  count: number;
next: string|null;
previous: string|null;
results: Event[];

}
export interface GetEventDataTWithAT {
  count: number;
next: string|null;
previous: string|null;
results: EventWithATStatus[];

}
export interface Location{
  "slug":string,
  "name":string
}
