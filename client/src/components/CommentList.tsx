import { Comment } from './PostList';

interface ListCommentsProps {
  comments: Comment[];
}

const CommentList = ({ comments }: ListCommentsProps): JSX.Element => {
  const renderedComments: JSX.Element[] = comments.map((comment) => {
    let content = '';

    if (comment.status === 'Approved') {
      content = comment.content;
    } else if (comment.status === 'Pending') {
      content = 'This comment is awaiting moderation';
    } else if (comment.status === 'Rejected') {
      content = 'This comment has been rejected';
    }
    return <li key={comment.id}>{content}</li>;
  });
  return (
    <div>
      <ul>{renderedComments}</ul>
    </div>
  );
};

export default CommentList;
