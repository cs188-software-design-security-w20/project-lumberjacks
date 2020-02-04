import React from 'react';
import GalleryItem from './GalleryItem';

class GalleryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // need to link GalleryItem components
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
