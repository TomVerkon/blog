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
const eventbusPort = process.env.REACT_APP_EVENTBUS_PORT;
const baseUrl = process.env.REACT_APP_BASE_URL;
const postPort = process.env.REACT_APP_POST_PORT;
const commentPort = process.env.REACT_APP_COMMENT_PORT;
const queryPort = process.env.REACT_APP_QUERY_PORT;
const moderationPort = process.env.REACT_APP_MODERATION_PORT;

interface Post {
  id: string;
  title: string;
}

interface Comment {
  id: string;
  content: string;
  postId: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface Event {
  type: string;
  data: Comment | Post;
}

const events: Event[] = [];

app.post('/events', (req, res) => {
  const event: Event = req.body;
  events.push(event);

  console.log('Received and emiting event:', event);
  axios.post(`${baseUrl}:${postPort}/events`, event);
  axios.post(`${baseUrl}:${commentPort}/events`, event);
  axios.post(`${baseUrl}:${queryPort}/events`, event);
  axios.post(`${baseUrl}:${moderationPort}/events`, event);
  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(eventbusPort, (): void => {
  return console.log(
    `EventBus: Express is listening at ${baseUrl}:${eventbusPort}`
  );
});
