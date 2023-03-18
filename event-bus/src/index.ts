import express from 'express';
import bodyParser from 'body-parser';
//import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
const port = process.env.REACT_APP_EVENTBUS_PORT;

app.post('/events', (req, res) => {
  const event = req.body;
  axios.post(
    `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_POST_PORT}/events`,
    event
  );
  axios.post(
    `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_COMMENT_PORT}/events`,
    event
  );
  axios.post(
    `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_QUERY_PORT}/events`,
    event
  );
  res.send({ status: 'OK' });
});

app.listen(port, (): void => {
  return console.log(
    `Express is listening at ${process.env.REACT_APP_BASE_URL}:${port}`
  );
});
