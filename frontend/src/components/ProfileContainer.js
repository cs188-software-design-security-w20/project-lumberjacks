import React from 'react';
import Core from '../api_clients/core';
import { StyledContainer } from './styles';

import ShortcutCard from '../components/ShortcutCard';

const ProfileContainer = ({}) => {
  const [links, setLinks] = React.useState(null);
  React.useEffect(() => {
    const getGallery = async () => {
      const gallery = await Core.getGallery();
      setLinks(gallery);
      console.log(gallery);
    };
    getGallery();
  }, []);
  return (
    <StyledContainer style={{ backgroundColor: '#ffffff' }}>
      {links == null
        ? null
        : links.map(linkObject => (
            <ShortcutCard
              style={{
                boxShadow: 'none',
                borderBottom: 'gray .5px solid',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
              urls={linkObject.links.split(',')}
              id={linkObject.id}
              shortcutName={linkObject.name}
              macro={'/' + linkObject.shortlink}
            />
          ))}
    </StyledContainer>
  );
};

export default ProfileContainer;
