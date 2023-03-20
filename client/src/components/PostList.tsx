import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const baseUrl = process.env.REACT_APP_BASE_URL;
const queryPort = process.env.REACT_APP_QUERY_PORT;

export interface Comment {
  id: string;
  content: string;
  postId?: string;
  status?: 'Pending' | 'Approved' | 'Rejected';
}

interface Post {
  id: string;
  title: string;
  comments: Comment[];
}

interface Posts {
  [key: string]: Post;
}

const PostList: FC = () => {
  const [posts, setPosts] = useState({} as Posts);

  const fetchPosts = async () => {
    const res = await axios.get(`${baseUrl}:${queryPort}/posts`);
    const posts = res.data as Posts;
    setPosts(posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts: JSX.Element[] = Object.values<Post>(posts).map(
    (post: Post) => {
      return (
        <div
          className="card"
          style={{ width: '30%', marginBottom: '20px' }}
          key={post.id}
        >
          <div className="card-body">
            <h3>{post.title}</h3>
            <CommentList comments={post.comments} />
            <CommentCreate postId={post.id} />
          </div>
        </div>
      );
    }
  );

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
