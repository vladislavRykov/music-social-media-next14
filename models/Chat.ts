
import { Schema, model, models } from 'mongoose';

const ChatSchema = new Schema(
    {
        members: {
          type: [Schema.Types.ObjectId],
          ref: 'User',
        },
        type: {
            type: String,
            default: 'dialog'  //'dialog' | 'group-chat'
        },
        lastMessage: {
          type: Schema.Types.ObjectId,
          ref: 'Message',
          default: null,
        },
      },
      {
        timestamps: true,
      },
);

export default models?.Chat || model('Chat', ChatSchema);
