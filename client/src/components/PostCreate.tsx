import { FC, useState } from 'react';
import axios from 'axios';

const PostCreate: FC = () => {
  const [title, setTitle] = useState('');

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setTitle(event.target.value);
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    console.log(title);
    event.preventDefault();
    await axios.post('http://localhost:4000/posts', { title });
    setTitle('');
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group m-2">
          <label>Title</label>
          <input
            value={title}
            className="form-control"
            onChange={onChangeHandler}
          ></input>
        </div>
        <button className="btn btn-primary m-2">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
