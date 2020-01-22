import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

render(
  <BrowserRouter>
    <div>hello world.</div>
  </BrowserRouter>,
  document.getElementById('mount'),
);
