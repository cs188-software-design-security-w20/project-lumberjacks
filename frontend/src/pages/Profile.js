import React, { useEffect, useState } from 'react';
import Core from '../api_clients/core';

import ShortcutCard from '../components/ShortcutCard';

const Profile = ({}) => {
  const [links, setLinks] = React.useState(null);
  useEffect(() => {
    (async function fetchGallery() {
      const gallery = await Core.getGallery();
      setLinks(gallery);
    })();
  }, [Core.getGallery, setLinks]);
  return (
    <div>
      {links == null
        ? null
        : links.map(linkObject => (
            <ShortcutCard
              key={linkObject.id}
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
    </div>
  );
};

export default Profile;
