import express from 'express';
import getToken from './utils/IdomooWrapper.js'
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());

app.post('/video', async (req, res) => {
  const { color, images, email, firstName, lastName, quality, resolution } = req.body;
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
    const token = await getToken();
    console.log(token)
    res.json({});
  } catch (err) {
    console.error('get video failed', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
