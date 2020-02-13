import React from 'react';
import Icon from './Icon';
import {
  StyledGalleryItem,
  StyledSubheaderText,
  StyledHeaderText,
  StyledList,
  StyledListItem,
} from './styles';

class GalleryItem extends React.Component {
  constructor(props) {
    super(props);
  }

  async sendShortcut(id) {
    // add logic for sending request for shortened link
  }

  render() {
    const { id, macro, urls, createdAt, userName, shortcutName } = this.props;
    return (
      <StyledGalleryItem>
        <StyledSubheaderText>{macro}</StyledSubheaderText>
        <StyledHeaderText>{shortcutName}</StyledHeaderText>
        <StyledList>
          <StyledListItem>http://facebook.com</StyledListItem>
          <StyledListItem>http://facebook.com</StyledListItem>
        </StyledList>
      </StyledGalleryItem>
    );
  }
}

export default GalleryItem;
