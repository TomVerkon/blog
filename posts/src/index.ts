import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
const port = process.env.REACT_APP_POST_PORT;
const eventBusPort = process.env.REACT_APP_EVENTBUS_PORT;
const baseUrl = process.env.REACT_APP_BASE_URL;

interface Post {
  id: string;
  title: string;
}

interface IndexedPost {
  [key: string]: Post;
}

interface Event {
  type: string;
  data: Post;
}

const posts: IndexedPost = {
  // '83d3e677': {
  //   id: '83d3e677',
  //   title: 'Nonsense',
  // },
};

const EventBusURL = `${baseUrl}:${eventBusPort}/events`;

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const post: Post = {
    id: randomBytes(4).toString('hex'),
    title: req.body.title,
  };
  posts[post.id] = post;
  // emit a postCreated event
  const event: Event = { type: 'PostCreated', data: post };
  console.log('Emiting event:', event);
  axios.post(EventBusURL, event);
  res.status(201).send(post);
});

app.post('/events', (req, res) => {
  console.log('Posts Svc Rcvd EventType: ', req.body as Event);
  res.send({}).status(200);
});

app.listen(port, (): void => {
  return console.log(`Posts Service listening at ${baseUrl}:${port}`);
});
