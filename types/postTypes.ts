import { ItemReactionStatus } from './likeAndDislikes';

export interface CreatePostTypes {
  title: string;
  content: string;
  author: string;
  image_url?: string;
}
export interface EditPostType extends CreatePostTypes {}
export interface MongoosePost {
  title: string;
  content: string;
  author: string;
  image_url?: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
}
export interface MongoosePostReactionT extends MongoosePost {
  reactionStatus: ItemReactionStatus;
}
