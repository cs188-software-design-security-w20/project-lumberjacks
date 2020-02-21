import React, { useEffect, useState } from 'react';
import ShortcutCard from '../components/ShortcutCard';
import AddShortcutContainer from './AddShortcut';

import { StyledContainer, StyledHeaderText } from '../components/styles';

import Core from '../api_clients/core';
import Modal from 'react-modal';

const FeedContainer = ({}) => {
  // Fetch feed, pass to component
  const [links, setLinks] = useState([]);
  const [offset, setOffset] = useState(0);
  const [forkModal, openFork] = useState(false);
  const [repostName, setRepostName] = useState('');
  const [repostLinks, setRepostLinks] = useState([]);
  const [repostId, setRepostId] = useState(-1);

  async function getLinks() {
    try {
      const data = await Core.getFeed(offset, 10, 0);
      setLinks(data);
    } catch (err) {
      return;
    }
  }

  async function getLinkInfo(id) {
    try {
      const data = await Core.getLink(id);
      console.log(data);
      setRepostId(id);
      setRepostLinks(data['links'].split(','));
      setRepostName(data['name']);
    } catch (err) {
      return;
    }
  }

  async function fork(id) {
    try {
      await getLinkInfo(id);
      openFork(true);
    } catch (err) {
      return;
    }
  }

  useEffect(() => getLinks(), []);

  return (
    <div>
      <Modal
        isOpen={forkModal}
        onRequestClose={() => openFork(false)}
        appElement={this}
      >
        <AddShortcutContainer
          forking
          repostId={repostId}
          filledLinks={repostLinks}
          repostName={repostName}
        />
      </Modal>
      <StyledContainer>
        <StyledHeaderText>Feed</StyledHeaderText>
        <div>
          {links.map(link => (
            <ShortcutCard
              id={link.id}
              macro={link.shortlink}
              urls={link.links.split(',')}
              shortcutName={link.name}
              forkable
              fork={() => fork(link.id)}
              forkName={link.repost_id !== -1 && 'another user'}
            />
          ))}
        </div>
      </StyledContainer>
    </div>
  );
};

export default FeedContainer;
