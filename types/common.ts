export interface FetchingErrorObj {
  message: string;
  type: string;
}
export enum AccessType {
  Public = 'public',
  Private = 'private',
  Link = 'link_access',
}

export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
