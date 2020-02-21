import React from 'react';
import ShortcutCard from './ShortcutCard';
import { StyledTitleText } from './styles';

// need to add logic to pull from data -> update GalleryItems

class GalleryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <StyledTitleText>Feed</StyledTitleText>
        <div></div>
      </div>
    );
  }
}

export default GalleryList;
