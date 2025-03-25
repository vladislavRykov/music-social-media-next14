import { updateChatLastMessage } from '@/dal/chat';
import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: false,
    },

    type: {
      type: String,
      default: 'text', // text or voice
    },

    voiceSrc: {
      type: String,
      required: false,
    },

    chat: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
    unread: {
      type: Boolean,
      required: true,
      default: false,
    },
    attachments: {
      type: [Schema.Types.ObjectId],
      ref: 'UploadedFile',
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
MessageSchema.pre('save', async function (next) {
  try {
    console.log(123, this);
    const chat = await updateChatLastMessage(this.chat.toString(), this._id.toString());
    // console.log(chat)

    next();
  } catch (error) {
    next(error);
  }
});

export default models?.Message || model('Message', MessageSchema);
