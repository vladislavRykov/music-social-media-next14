export enum RelationStatus {
  Friends = 'friends',
  Blocked = 'blocked',
}
export enum FriendRequestStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected',
}
export interface FriendRequestMongooseT {
  from: string;
  status: FriendRequestStatus;
  createdAt: Date;
}
export interface FriendRequestMongoosePopulatedT {
  from: { username: string; avatar?: string; _id: string };
  status: FriendRequestStatus;
  createdAt: Date;
}
export interface addFriendRequestT {
  from: string;
}
export interface RelationMongooseT {
  _id: string;
  userA: string;
  userB: string;
  status: RelationStatus;
  createdAt: string;
  updatedAt: string;
}
