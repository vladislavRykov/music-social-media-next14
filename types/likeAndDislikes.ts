export interface LikeAndDislike {
  _id: string;
  userId: string;
  songId: string;
  type: string;
}
export enum LikeOrDislike {
  Like = 'like',
  Dislike = 'dislike',
}
export enum ItemReactionStatus {
  Liked = 'liked',
  Disliked = 'disliked',
  None = 'none',
}
export enum TargetTypes {
  Post = 'Post',
  Music = 'Music',
}
export interface ReactionT {
  userId: string;
  targetId: string;
  targetType: TargetTypes;
  reactionType: LikeOrDislike;
}
export interface CreateReactionT {
  targetId: string;
  targetType: TargetTypes;
  reactionType: LikeOrDislike | null;
}
