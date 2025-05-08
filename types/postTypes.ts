export type CreatePostTypes = {
  title: string;
  content: string;
  author: string;
  image_url: string;
};
export type MongoosePost = {
  title: string;
  content: string;
  author: string;
  image_url: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};
