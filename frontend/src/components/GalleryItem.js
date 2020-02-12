import React from 'react';
import Icon from './Icon';
import { StyledGalleryItem } from './styles';

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
      <StyledGalleryItem>
        <id>{id}</id>
        <Icon />
      </StyledGalleryItem>
    );
  }
}

export default GalleryItem;
