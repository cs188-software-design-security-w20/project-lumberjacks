import React from 'react';
import Shortcut from './Shortcut';
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
        <div>
          <Shortcut id="0" shortcutName="Bryan's link" macro="H532AL3M3" />
        </div>
      </div>
    );
  }
}

export default GalleryList;
