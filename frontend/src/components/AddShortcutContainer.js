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

import Core from '../api_clients/core';
import { VisibilityType, POSTTYPE } from '../api_clients/core';

const AddShortcutContainer = ({}) => {
  const [links, setLinks] = React.useState(['']);
  const [shotcutName, setShortcutName] = React.useState(null);

  const addShortcut = async ({
    links,
    name,
    post_type,
    visibility,
    repost_id,
  }) => {
    try {
      const res = await Core.addLink({
        name,
        links,
        visibility,
        post_type,
        repost_id,
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <StyledContainer>
      <StyledHeaderText>Add a shortcut</StyledHeaderText>
      <StyledSubheaderText>
        Input some text below to generate a lumberlink.
      </StyledSubheaderText>
      <div>
        <StyledLabelText>Name</StyledLabelText>
        <input onChange={e => setShortcutName(e.target.value)}></input>
      </div>
      <div>
        <StyledLabelText>Links</StyledLabelText>
        <StyledList>
          {links.map((link, index) => (
            <StyledListItem>
              {' '}
              <input
                key={link + index}
                onChange={e => (links[index] = e.target.value)}
                placeholder="ex: google.com"
              ></input>
            </StyledListItem>
          ))}
        </StyledList>
        <StyledButton
          onClick={() => {
            setLinks(links.concat(['']));
          }}
        >
          Add link
        </StyledButton>
      </div>
      <StyledButton
        onClick={() =>
          addShortcut({
            links,
            name: 'bryans link',
            visibility: VisibilityType.GLOBAL,
            post_type: POSTTYPE.DEFAULT,
          })
        }
      >
        Continue
      </StyledButton>
    </StyledContainer>
  );
};

export default AddShortcutContainer;
