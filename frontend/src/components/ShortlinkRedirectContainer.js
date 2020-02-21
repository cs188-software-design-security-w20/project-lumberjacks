import React from 'react';

import { useParams } from 'react-router-dom';
import { StyledContainer, StyledHeaderText } from './styles';
import Core from '../api_clients/core';

const ShortlinkRedirectContainer = () => {
	const { shortlink } = useParams();
	const [ links, setLinks ] = React.useState(null);
	const [ permissions, setPermissions ] = React.useState(true);
	const [ errorMsg, setErr ] = React.useState('');

	React.useEffect(
		() => {
			const getLinks = async () => {
				try {
					const links = await Core.getLinks({ shortlink });
					setLinks(links);
					links['links'].split(',').forEach((link, index) => {
						window.open('http://' + link, '_blank');
					});
				} catch (err) {
					setPermissions(false);
					setErr(err['errorResponse']);
				}
			};
			getLinks();
		},
		[ shortlink ]
	);

	return (
		<StyledContainer>
			{permissions ? (
				<StyledHeaderText>Opening your links...</StyledHeaderText>
			) : (
				<StyledHeaderText>{errorMsg}</StyledHeaderText>
			)}
		</StyledContainer>
	);
};

export default ShortlinkRedirectContainer;
