import express from 'express';
import bodyParser from 'body-parser';
//import { randomBytes } from 'crypto';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

interface Comment {
  id: string;
  content: string;
  postId: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface Event {
  type: string;
  data: Comment;
}

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const baseUrl = process.env.REACT_APP_BASE_URL;
const port = process.env.REACT_APP_MODERATION_PORT;
const commentCreated = process.env.REACT_APP_COMMENT_CREATED;
const commentModerated = process.env.REACT_APP_COMMENT_MODERATED;
const eventBusPort = process.env.REACT_APP_EVENTBUS_PORT;

app.post('/events', async (req, res) => {
  const { type, data } = req.body as Event;
  // receives a commentCreated event and emits a commentModerated event
  if (type === commentCreated) {
    console.log('Moderation Service rcvd Event: ', req.body);
    const moderatedStatus = data.content.includes('orange')
      ? 'Rejected'
      : 'Approved';
    const commentModeratedEvent: Event = {
      type: commentModerated,
      data: { ...data, status: moderatedStatus },
    };
    await axios.post(
      `${baseUrl}:${eventBusPort}/events`,
      commentModeratedEvent
    );
    console.log('Moderation Service emiting: ', commentModeratedEvent);
  }
  res.send({});
});

app.listen(port, (): void => {
  return console.log(`Moderation Service listening at ${baseUrl}:${port}`);
});
