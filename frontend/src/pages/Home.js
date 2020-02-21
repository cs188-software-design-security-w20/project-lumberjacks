import React from 'react';
import Login from './Login';

const Home = props => {
  return (
    <div>
      <Login login={true} authUser={props.authUser} history={props.history} />
      <Login login={false} />
    </div>
  );
};

export default Home;
