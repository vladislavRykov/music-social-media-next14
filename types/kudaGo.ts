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
export interface GetEventDataT {
  count: number;
next: string|null;
previous: string|null;
results: Event[];

}
export interface Location{
  "slug":string,
  "name":string
}
