import React from 'react';
import {
  StyledContainer,
  StyledHeaderText,
  StyledSubheaderText,
  StyledButton,
  StyledLabelText,
  StyledList,
  StyledListItem,
} from './styles';

import lumberFetch from '../lumberfetch';

const AddShortcutContainer = ({}) => {
  const [url, setURL] = React.useState('');
  const [shotcutName, setShortcutName] = React.useState(null);

  const generateShortcut = (urls, shortcutName) => {};

  return (
    <StyledContainer>
      <StyledHeaderText>Add a shortcut</StyledHeaderText>
      <StyledSubheaderText>
        Input some text below to generate a lumberlink.
      </StyledSubheaderText>
      <div>
        <StyledLabelText>Name</StyledLabelText>
        <input></input>
      </div>
      <div>
        <StyledLabelText>Links</StyledLabelText>
        <StyledList>
          <StyledListItem>
            <input placeholder="ex: google.com"></input>
            <input placeholder="ex: google.com"></input>
          </StyledListItem>
        </StyledList>
      </div>
      <StyledButton onClick={() => null}>Get link</StyledButton>
    </StyledContainer>
  );
};

export default AddShortcutContainer;
