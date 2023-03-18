import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
const port = process.env.REACT_APP_POST_PORT;

interface Post {
  [key: string]: {
    id: string;
    title: string;
  };
}

const posts: Post = {
  '83d3e677': {
    id: '83d3e677',
    title: 'Nonsense',
  },
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  console.log(req.body);
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = { id, title };
  res.status(201).send(posts[id]);
});

app.listen(port, (): void => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
