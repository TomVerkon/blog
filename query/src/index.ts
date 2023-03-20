import express from 'express';
import bodyParser from 'body-parser';
//import { randomBytes } from 'crypto';
import cors from 'cors';
import dotenv from 'dotenv';
//import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const baseUrl = process.env.REACT_APP_BASE_URL;
const port = process.env.REACT_APP_QUERY_PORT;
const POST_CREATED = process.env.REACT_APP_POST_CREATED;
const COMMENT_CREATED = process.env.REACT_APP_COMMENT_CREATED;
const COMMENT_UPDATED = process.env.REACT_APP_COMMENT_UPDATED;

interface Comment {
  id: string;
  content: string;
  postId?: string;
  status?: 'Pending' | 'Approved' | 'Rejected';
}

interface Post {
  id: string;
  title: string;
  comments?: Comment[];
}

interface Posts {
  [key: string]: Post;
}

interface Event {
  type: string;
  data: Post | Comment;
}

const posts: Posts = {
  // '83d3e677': {
  //   id: '83d3e677',
  //   title: 'Nonsense',
  //   comments: [
  //     {
  //       id: 'ad1f2bf0',
  //       content: 'Just a Nonsense comment',
  //       status: 'Approved',
  //     },
  //     {
  //       id: 'ad1f2bf1',
  //       content: 'Just another Nonsense comment',
  //       status: 'Approved',
  //     },
  //   ],
  // },
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body as Event;
  if (type === POST_CREATED) {
    console.log('Query Service received POST_CREATED event:', data);
    const { id, title } = data as Post;
    posts[id] = { id, title, comments: [] };
  }
  if (type === COMMENT_CREATED) {
    console.log('Query Service received COMMENT_CREATED event:', req.body);
    const { id, content, postId, status } = data as Comment;
    const post = posts[postId];
    if (post) {
      post.comments.push({ id, content, postId, status });
    }
  }
  if (type === COMMENT_UPDATED) {
    const { id, postId, content, status } = data as Comment;
    const post = posts[postId];
    if (post) {
      const postComments = post.comments;
      const comment = postComments.find((comment) => comment.id === id);
      if (comment) {
        comment.status = status;
        comment.content = content;
        posts[postId].comments = postComments;
      }
    }
  }
  //console.log(JSON.stringify(posts, null, 2));
  res.send({});
});

app.listen(port, (): void => {
  return console.log(`Query Service listening at ${baseUrl}:${port}`);
});
