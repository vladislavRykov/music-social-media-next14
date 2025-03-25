export interface LikeAndDislike {
    _id: string,
    userId: string,
      songId: string,
      type: string,
}
export enum LikeOrDislike {
    Like = 'like',
    Dislike = 'dislike',
  }