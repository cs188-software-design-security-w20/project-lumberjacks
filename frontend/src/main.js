import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'normalize.css';
import App from 'app';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('mount'),
);
