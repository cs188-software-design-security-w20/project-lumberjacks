import React from 'react';
import {
  StyledContainer,
  StyledHeaderText,
  StyledSubheaderText,
  StyledButton,
  StyledLabelText,
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
        <StyledLabelText>URL</StyledLabelText>
        <textarea></textarea>
      </div>
      <div>
        <StyledLabelText>Shortcut name (optional)</StyledLabelText>
        <textarea></textarea>
      </div>
      <StyledButton onClick={() => null}>Get link</StyledButton>
    </StyledContainer>
  );
};

export default AddShortcutContainer;
