import React from 'react';
import FeedContainer from '../components/FeedContainer';
import Login from './Login';

const Home = () => (
  <>
    <Login login={true} />
    <Login login={false} />
  </>
);

export default Home;
