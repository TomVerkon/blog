import { useState, useEffect } from 'react';
import axios from 'axios';

interface ListCommentsProps {
  postId: string;
}

interface Comment {
  id: string;
  content: string;
}

const CommentList = ({ postId }: ListCommentsProps): JSX.Element => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_COMMENT_PORT}/posts/${postId}/comments`
    );
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderedComments: JSX.Element[] = comments.map((comment: Comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });
  return (
    <div>
      <ul>{renderedComments}</ul>
    </div>
  );
};

export default CommentList;
