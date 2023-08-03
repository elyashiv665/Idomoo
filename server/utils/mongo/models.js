import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true
  },
  color: {
    type: String,
    require: true
  },
  quality: {
    type: String,
    require: true
  },
  resolution: {
    type: String,
    require: true
  },
  Size: {
    type: Number,
    require: true
  },
  Volume: {
    type: String,
    require: true
  },
  Path: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true
  },
  email: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  } 
 
});

export default mongoose.model('Video', videoSchema);
