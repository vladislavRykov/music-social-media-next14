
import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
        author: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        image_url:{
          type: String,
          required: false,

        }
      },
      {
        timestamps: true,
      },
);

export default models?.Post || model('Post', PostSchema);
