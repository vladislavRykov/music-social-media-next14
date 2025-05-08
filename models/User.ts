import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    banner: {
      type: String,
      required: false,
    },
    aboutMe: {
      type: String,
      required: false,
    },
    isVerfied: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordTokenExpiry: {
      type: Number,
    },
    newEmail: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      default: null,
    
    },
    verifyToken: String,
    verifyTokenExpiry: Number,
  },
  {
    timestamps: true,
  },
);

export default models?.User || model('User', UserSchema);
