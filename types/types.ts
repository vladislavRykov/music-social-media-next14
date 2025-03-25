import { StaticImageData } from 'next/image';

export interface RegistrationData {
  username: string;
  email: string;
  password: string;
}
export interface LoginData {
  email: string;
  password: string;
}
export interface SessionPayload {
  userId: string;
  expiresAt: Date;
}
export interface UserMainFields {
  _id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
  avatar?: string;
  banner?: string;
  aboutMe?: string;
}
export interface UserProfileData {
  _id: string;
  username: string;
  avatar?: string;
  banner?: string;
}
export interface UserDataMongoose {
  _id: string;
  username: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  banner?: string;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: number;
  verifyToken?: string;
  verifyTokenExpiry?: number;
  isVerfied: boolean;
  isAdmin: boolean;
  aboutMe?: string;
}

export interface MusicData {
  _id: string;
  author: string;
  title: string;
  image: string;
  songPath: string;
  viewsCount: number;
  duration: number;
  likes: number;
  dislikes: number;
  // filters: {
  //   genres: Genre[];
  //   year: number | null;
  //   season: string | null;
  // };
}
export interface Genre {
  _id: string;
  label: string;
  value: string; // или подходящий тип
  __v: number; // Добавьте поле __v
}
