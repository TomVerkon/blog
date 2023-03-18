import express from 'express';
import bodyParser from 'body-parser';
//import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 4005;

app.post('/events', (req, res) => {
  const event = req.body;
  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);
  res.send({ status: 'OK' });
});

app.listen(port, (): void => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
