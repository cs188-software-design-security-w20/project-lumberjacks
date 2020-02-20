import React from 'react';

import { useParams } from 'react-router-dom';
import { StyledContainer, StyledHeaderText } from './styles';
import Core from '../api_clients/core';

const ShortlinkRedirectContainer = () => {
  const { shortlink } = useParams();
  const [links, setLinks] = React.useState(null);

  React.useEffect(() => {
    const getLinks = async () => {
      const links = await Core.getLinks({ shortlink });
      setLinks(links);
      console.log(links);
      links['links'].split(',').forEach((link, index) => {
        window.open('http://' + link);
        console.log(link);
      });
    };
    getLinks();
  }, [shortlink]);

  return (
    <StyledContainer>
      <StyledHeaderText>Opening your links...</StyledHeaderText>
    </StyledContainer>
  );
};

export default ShortlinkRedirectContainer;
