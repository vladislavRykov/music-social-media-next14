import { findChatById, updateChatLastMessage } from '@/dal/chat';
import { isUserBlocked } from '@/dal/relation';
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
    const chat = await findChatById(this.chat.toString());
    if (chat?.type === 'dialog') {
      const otherMember = chat.members.filter((user) => user.toString() !== this.author.toString());

      const isBlocked = await isUserBlocked({
        currentUserId: this.author.toString(),
        otherUserId: otherMember[0],
      });

      if (isBlocked) {
        throw new Error('Сообщение не может быть отправлено');
      }
    }
    await updateChatLastMessage(this.chat.toString(), this._id.toString());
    next();
  } catch (error) {
    next(error);
  }
});

export default models?.Message || model('Message', MessageSchema);
