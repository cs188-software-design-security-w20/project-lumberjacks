import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from 'app';
import User from './api_clients/user';

User.createUser({
  // email: 'michael@gmail.com',
  username: 'poophead2',
  password: 'password',
});

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('mount'),
);
