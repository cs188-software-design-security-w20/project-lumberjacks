import React from 'react';
import GalleryList from '../components/GalleryList';
import Login from './Login';
import AddShortcutContainer from '../components/AddShortcutContainer';

const Home = () => (
  <div>
    <Login />
    <GalleryList />
    <AddShortcutContainer />
  </div>
);

export default Home;
