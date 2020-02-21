import React from 'react';
import {
  StyledContainer,
  StyledHeaderText,
  StyledSubheaderText,
  StyledButton,
  StyledLabelText,
  StyledList,
  StyledInput,
  StyledListItem,
} from './styles';

import Core from '../api_clients/core';
import { VisibilityType, POSTTYPE } from '../api_clients/core';

const AddShortcutContainer = ({}) => {
  const [links, setLinks] = React.useState([{ value: null }]);
  const [linksAdded, setLinksAdded] = React.useState(false);
  const [visibility, setVisibility] = React.useState(VisibilityType.PRIVATE);
  const [shortcutName, setShortcutName] = React.useState(null);

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

  const handleChange = (index, e) => {
    links[index].value = e.target.value;
    setLinks([...links]);
  };

  return linksAdded ? (
    <StyledContainer>
      <StyledHeaderText>Review your link and sharing settings</StyledHeaderText>
      <div>LINKS GO HERE</div>
      <div>
        <StyledInput
          onClick={() => {
            setVisibility(VisibilityType.PUBLIC);
          }}
          type="checkbox"
        />{' '}
        <label>Make visibility public</label>
        <StyledInput
          onClick={() => setVisibility(VisibilityType.GLOBAL)}
          disabled={visibility === VisibilityType.PRIVATE}
          type="checkbox"
        ></StyledInput>
        <label> Publish to globalFeed</label>
      </div>
      <StyledButton
        onClick={() =>
          addShortcut({
            links: links.map(link => link.value),
            name: shortcutName,
            visibility,
            post_type: POSTTYPE.DEFAULT,
          })
        }
      >
        Create
      </StyledButton>
    </StyledContainer>
  ) : (
    <StyledContainer>
      <div style={{ marginBottom: 25 }}>
        <StyledLabelText>Name</StyledLabelText>
        <StyledInput
          placeholder="ex: Michael's link"
          onChange={e => setShortcutName(e.target.value)}
        ></StyledInput>
      </div>
      <div style={{ marginBottom: 50 }}>
        <StyledLabelText>Links</StyledLabelText>
        <StyledList>
          {links.map((link, index) => (
            <StyledListItem key={link + index}>
              {' '}
              <StyledInput
                onChange={e => handleChange(index, e)}
                placeholder="ex: google.com"
              ></StyledInput>
            </StyledListItem>
          ))}
        </StyledList>
        <StyledButton
          onClick={() => {
            setLinks([...links, { value: null }]);
          }}
        >
          Add link
        </StyledButton>
      </div>
      <StyledButton onClick={() => setLinksAdded(true)}>Continue</StyledButton>
    </StyledContainer>
  );
};

export default AddShortcutContainer;
