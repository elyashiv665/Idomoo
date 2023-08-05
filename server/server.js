import express from 'express';
import {generateVideo, callIdomoo} from './utils/IdomooWrapper.js'
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());

app.post('/video', async (req, res) => {
  const {data,resolutionHeight,quality,format,fps} = req.body;
  if(data?.Text1 ==='undefined' || data?.Media1==='undefined' || !fps || !resolutionHeight || !quality || !format){
    res.status(400).json({ error: 'bad params' });
  }
  try {
    const resData = await generateVideo(req.body);

    res.status(202).json(resData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/videoStatus', async (req, res) => {
  try {
    const url = req.query.url;

    const updateData = await callIdomoo(url, undefined, 'get');
    const status = updateData.data.status;
    res.status(200).json(status);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
  
});

app.get('/videoContent', async (req, res) => {
  try {
    const url = req.query.url;

    const videoContent = await callIdomoo(url, undefined, 'get');
    const video = videoContent.data;
    res.status(200).send(video);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
