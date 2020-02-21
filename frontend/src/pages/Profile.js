import React, { useEffect, useState } from 'react';
import Core from '../api_clients/core';

import { StyledContainer } from '../components/styles';

import ShortcutCard from '../components/ShortcutCard';
import { StyledContainer, StyledHeaderText } from '../components/styles';

const Profile = ({}) => {
  const [links, setLinks] = React.useState(null);
  useEffect(() => {
    (async function fetchGallery() {
      const gallery = await Core.getGallery();
      setLinks(gallery);
    })();
  }, [Core.getGallery, setLinks]);
  return (
    <StyledContainer style={{ backgroundColor: 'white' }}>
      {links == null
        ? null
        : links.map(linkObject => (
            <ShortcutCard
              key={linkObject.id}
              urls={linkObject.links.split(',')}
              id={linkObject.id}
              shortcutName={linkObject.name}
              macro={'/' + linkObject.shortlink}
            />
          ))}
    </StyledContainer>
  );
};

export default Profile;
