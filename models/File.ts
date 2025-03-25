
  import { Schema, model, models } from 'mongoose';

const FileSchema = new Schema({
    
        fileName: {
          type: String,
          required: true,
        },
        source: {
          type: String,
          required: true,
        },
        size: Number,
        mimetype: String,
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        // message: {
        //   type: ObjectId,
        //   ref: 'Message',
        //   required: true,
        // },
      
    },
    {
      timestamps: true,
}
);

export default models?.File || model('File', FileSchema);
