import React, { useEffect, useState } from 'react';
import ShortcutCard from '../components/ShortcutCard';
import Core from '../api_clients/core';

const FeedContainer = ({}) => {
  const [links, setLinks] = useState(null);
  useEffect(() => {
    (async function fetchGallery() {
      const gallery = await Core.getGallery();
      setLinks(gallery);
    })();
  }, []);
  return (
    <div>
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
    </div>
  );
};

export default FeedContainer;
