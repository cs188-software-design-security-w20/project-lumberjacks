import React, { useEffect, useState } from 'react';
import ShortcutCard from '../components/ShortcutCard';
import ErrorString from '../components/ErrorString';
import AddShortcutContainer from './AddShortcut';

import { StyledContainer, StyledHeaderText } from '../components/styles';

import Core from '../api_clients/core';
import Modal from 'react-modal';
import { customSetError } from './utils';

const FeedContainer = ({ isLoggedIn }) => {
  // Fetch feed, pass to component
  const [links, setLinks] = useState([]);
  const [offset, setOffset] = useState(0);
  const [forkModal, openFork] = useState(false);
  const [repostName, setRepostName] = useState('');
  const [repostLinks, setRepostLinks] = useState([]);
  const [repostId, setRepostId] = useState(-1);
  const [error, setError] = useState(null);

  async function getLinks() {
    try {
      const data = await Core.getFeed(offset, 10, 0);
      setLinks(data);
      setError(null);
    } catch (err) {
      customSetError(err, setError);
    }
  }

  async function getLinkInfo(id) {
    try {
      const data = await Core.getLink(id);
      setRepostId(id);
      setRepostLinks(data['links'].split(','));
      setRepostName(data['name']);
      setError(null);
    } catch (err) {
      customSetError(err, setError);
    }
  }

  async function fork(id) {
    try {
      await getLinkInfo(id);
      openFork(true);
      setError(null);
    } catch (err) {
      customSetError(err, setError);
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
      <StyledContainer style={{ paddingTop: '80px' }}>
        <div>
          {links.map(link => (
            <ShortcutCard
              id={link.id}
              macro={link.shortlink}
              urls={link.links.split(',')}
              shortcutName={link.name}
              forkable={isLoggedIn}
              fork={() => fork(link.id)}
              forkName={link.repost_id !== -1 && 'another user'}
            />
          ))}
        </div>
        {error && <ErrorString>{error}</ErrorString>}
      </StyledContainer>
    </div>
  );
};

export default FeedContainer;
