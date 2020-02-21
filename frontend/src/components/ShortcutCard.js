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
    return (
      <StyledGalleryItem style={style}>
        {macro != null ? (
          <StyledSubheaderText
            style={{ color: 'rgba(0, 0, 0, 0.6)', marginBottom: '10px' }}
          >
            {macro}
          </StyledSubheaderText>
        ) : null}
        <StyledHeaderText style={{ fontWeight: 'bold', marginBottom: '10px' }}>
          {shortcutName}
        </StyledHeaderText>
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
