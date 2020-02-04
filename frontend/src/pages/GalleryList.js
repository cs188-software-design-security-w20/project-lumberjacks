import React from 'react';
import GalleryItem from './GalleryItem';

// need to add logic to pull from data -> update GalleryItems

class GalleryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Gallery List</h1>
        <div>
          <GalleryItem />
        </div>
      </div>
    );
  }
}

export default GalleryList;
