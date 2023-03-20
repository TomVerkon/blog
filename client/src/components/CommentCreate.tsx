import axios from 'axios';
import React, { useState } from 'react';

interface CommentCreateProps {
  postId: string;
}

const CommentCreate: React.FC<CommentCreateProps> = ({ postId }) => {
  const [content, setContent] = useState<string>('');

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setContent(event.target.value);
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    //console.log(content);
    event.preventDefault();
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_COMMENT_PORT}/posts/${postId}/comments`,
      {
        content,
      }
    );
    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group m-2">
          <label>Comment</label>
          <input
            value={content}
            className="form-control"
            onChange={onChangeHandler}
          ></input>
        </div>
        <button className="btn btn-primary m-2">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
