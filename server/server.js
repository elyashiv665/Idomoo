import express from 'express';
import getToken from './utils/IdomooWrapper.js'

const app = express();
const port = 3000;

app.use(express.json());

app.post('/video', async (req, res) => {
  const {params,resolutionHeight,quality,outpuyFormat,fps} = req.body;
  console.log('params', params);
  console.log('resolutionHeight', resolutionHeight);
  console.log('quality', quality);
  console.log('outpuyFormat', outpuyFormat);
  console.log('fps', fps);

  try {
    // TODO: add call to Idomoo 
    res.status(201).json({});
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/video', async (req, res) => {
  try {
    // TODO: add call to Idomoo 
    res.json({});
  } catch (err) {
    console.error('get video failed', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
