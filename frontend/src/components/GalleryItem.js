import React from 'react';
import Icon from './Icon';

class GalleryItem extends React.Component {
  constructor(props) {
    super(props);
  }

  async sendShortcut(id) {
    // add logic for sending request for shortened link
  }

  render() {
    const { id, shortcut, urls, createdAt, display } = this.props;
    return (
      <>
        <div>{id}</div>
        <Icon />
      </>
    );
  }
}

export default GalleryItem;
