import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const port = process.env.REACT_APP_COMMENT_PORT;

interface CommentsByPostId {
  [key: string]: Array<{
    id: string;
    content: string;
  }>;
}

const commentsByPostId: CommentsByPostId = {
  '83d3e677': [
    {
      id: 'ad1f2bf0',
      content: 'Just a Nonsense comment',
    },
    {
      id: 'ad1f2bf1',
      content: 'Just another Nonsense comment',
    },
  ],
};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
  //res.send(commentsByPostId || []);
  console.log(commentsByPostId);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(port, (): void => {
  return console.log(
    `Express is listening at ${process.env.REACT_APP_BASE_URL}:${port}`
  );
});
