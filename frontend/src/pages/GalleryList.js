import React from 'react';

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
          <h2>[gallery items go here!]</h2>
        </div>
      </div>
    );
  }
}
