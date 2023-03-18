import { FC } from 'react';
import PostCreate from './components/PostCreate';
import PostList from './components/PostList';

const App: FC = () => {
  return (
    <div className="container">
      <h1>Blog Client App</h1>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  );
};

export default App;
