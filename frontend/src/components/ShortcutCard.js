import React from 'react';
import {
  StyledGalleryItem,
  StyledSubheaderText,
  StyledHeaderText,
  StyledList,
  StyledListItem,
} from './styles';

class ShortcutCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      macro,
      urls,
      createdAt,
      userName,
      shortcutName,
      style,
    } = this.props;
    if (urls == null || shortcutName == null) {
      return (
        <StyledHeaderText>You didn't give me any shortcuts :(</StyledHeaderText>
      );
    }
    return (
      <StyledGalleryItem style={style}>
        {macro != null ? (
          <StyledSubheaderText>{macro}</StyledSubheaderText>
        ) : null}
        <StyledHeaderText>{shortcutName}</StyledHeaderText>
        <StyledList>
          {urls.map((url, index) => (
            <StyledListItem key={url + index}>{url}</StyledListItem>
          ))}
        </StyledList>
      </StyledGalleryItem>
    );
  }
}

export default ShortcutCard;
