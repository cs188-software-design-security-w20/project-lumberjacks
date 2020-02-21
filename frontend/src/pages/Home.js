import React from 'react';
import Login from './Login';

import { StyledButton } from '../components/styles';

const Home = props => {
  return (
    <div>
      <Login
        login={true}
        authUser={props.authUser}
        history={props.history}
        children={
          <StyledButton
            onClick={() => {
              window.location.href = '/signup';
            }}
          >
            Sign up
          </StyledButton>
        }
      />
    </div>
  );
};

export default Home;
