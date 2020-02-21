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
            style={{ fontSize: '1rem', marginBottom: 3, color: 'gray' }}
          >
            {macro}
          </StyledSubheaderText>
        ) : null}
        <StyledHeaderText style={{ marginBottom: 10, fontWeight: 'bold' }}>
          {shortcutName}
        </StyledHeaderText>
        <StyledList>
          {urls.map((url, index) => (
            <StyledListItem style={{ color: 'darkgray' }} key={url + index}>
              {url}
            </StyledListItem>
          ))}
        </StyledList>
      </StyledGalleryItem>
    );
  }
}

export default ShortcutCard;
