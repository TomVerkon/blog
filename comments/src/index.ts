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

const baseUrl = process.env.REACT_APP_BASE_URL;
const commentPort = process.env.REACT_APP_COMMENT_PORT;
const eventBusPort = process.env.REACT_APP_EVENTBUS_PORT;
const eventBusURL = `${baseUrl}:${eventBusPort}/events`;
const commentModerated = process.env.REACT_APP_COMMENT_MODERATED;
const commentUpdated = process.env.REACT_APP_COMMENT_UPDATED;

interface Comment {
  id: string;
  content: string;
  postId: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface CommentsByPostId {
  [key: string]: Array<Comment>;
}

interface Event {
  type: string;
  data: Comment;
}

const commentsByPostId: CommentsByPostId = {
  // '83d3e677': [
  //   {
  //     id: 'ad1f2bf0',
  //     content: 'Just a Nonsense comment',
  //     status: 'Approved',
  //   },
  //   {
  //     id: 'ad1f2bf1',
  //     content: 'Just another Nonsense comment',
  //     status: 'Approved',
  //   },
  // ],
};

// get all comments by postId
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// create a new comment and associate it with post
app.post('/posts/:id/comments', async (req, res) => {
  const comment: Comment = {
    id: randomBytes(4).toString('hex'),
    content: req.body.content,
    postId: req.params.id,
    status: 'Pending',
  };
  const comments = commentsByPostId[req.params.id] || [];
  comments.push(comment);
  commentsByPostId[req.params.id] = comments;

  // emit commentCreated event
  const event: Event = { type: 'CommentCreated', data: comment };
  console.log('Emiting event:', event);
  await axios.post(eventBusURL, event);

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body as Event;
  // receives a commentModerated event and emits a commentUpdated event
  if (type === commentModerated) {
    console.log('Cmnts Svc Rcvd Event: ', req.body);
    const comments = commentsByPostId[data.postId] as Comment[];
    //console.log(comments);
    if (comments) {
      const comment = comments.find((comment) => comment.id === data.id);
      if (comment) {
        comment.status = data.status;
        commentsByPostId[data.postId] = comments;
        await axios.post(eventBusURL, { type: commentUpdated, data: comment });
      } else {
        console.log('Comment with id: ', data.id, ' was not found');
      }
    } else {
      console.log(
        'Comments associated with Post: ',
        data.postId,
        'were not found'
      );
    }
  }
  res.send({}).status(200);
});

app.listen(commentPort, (): void => {
  return console.log(`Comments Service listening at ${baseUrl}:${commentPort}`);
});
