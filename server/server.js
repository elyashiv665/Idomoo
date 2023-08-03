import mongoose from 'mongoose';
import Video from './utils/mongo/models.js';
import express from 'express';

// Connect to MongoDB database
mongoose
  .connect('mongodb://mongo/domains')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));



const app = express();
const port = 3000;

app.use(express.json());

app.post('/video', async (req, res) => {
  const { color, images, email, firstName, lastName, quality, resolution } = req.body;
  try {
    const newVideo = new Video({
      color,
      images,
      email,
      firstName,
      lastName,
      quality,
      resolution,
      status: VideoStatusEnum.SENT
    });
    const savedVideo = await newVideo.save();
    // TODO: add call to Idomoo 
    res.status(201).json(savedVideo);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find({});
    res.json(videos);
    // TODO: handle status
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/video/:videoId', async (req, res) => {
  const videoId = req.params.videoId;
  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    // TODO: handle status
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/video/:videoId', async (req, res) => {
  const videoId = req.params.videoId;
  const { color, images } = req.body;
  try {
    const updatedVideo = await Video.findByIdAndUpdate(videoId, { color, images }, { new: true });
    if (!updatedVideo) {
      return res.status(404).json({ error: 'Video not found' });
    }
    // TODO: add call to Idomoo 
    res.json(updatedVideo);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
