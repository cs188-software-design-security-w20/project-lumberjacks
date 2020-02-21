import React from 'react';
import {
	StyledContainer,
	StyledHeaderText,
	StyledSubheaderText,
	StyledButton,
	StyledLabelText,
	StyledList,
	StyledInput,
	StyledCheckbox,
	StyledListItem,
	StyledGrayBox,
	StyledGrayTextArea
} from './styles';

import ShortcutCard from '../components/ShortcutCard';
import Core from '../api_clients/core';
import { VisibilityType, POSTTYPE } from '../api_clients/core';

const AddShortcutContainer = ({ forking, filledLinks, repostId, repostName }) => {
	const filledValues = filledLinks.map((link) => ({ value: link }));

	const [ links, setLinks ] = React.useState(forking ? filledValues : [ { value: null } ]);
	const [ linksAdded, setLinksAdded ] = React.useState(false);
	const [ pageState, setPageState ] = React.useState(0);
	const [ visibility, setVisibility ] = React.useState(VisibilityType.PRIVATE);
	const [ shortcutName, setShortcutName ] = React.useState(null);
	const [ macro, setMacro ] = React.useState(null);

	const addShortcut = async ({ links, name, post_type, visibility, repost_id, callback }) => {
		try {
			const res = await Core.addLink({
				name,
				links,
				visibility,
				post_type,
				repost_id
			});
			callback(res.shortlink);
			console.log(res);
		} catch (e) {
			console.log(e);
		}
	};

	const handleChange = (index, e) => {
		links[index].value = e.target.value;
		setLinks([ ...links ]);
		console.log(links);
	};

	const toggleVisibility = () => {
		console.log(visibility);
		if (visibility === VisibilityType.PRIVATE) {
			setVisibility(VisibilityType.PUBLIC);
		} else {
			setVisibility(VisibilityType.PRIVATE);
		}
	};

	let activeComponent;

	switch (pageState) {
		case 0:
			activeComponent = (
				<StyledContainer>
					{forking && <StyledHeaderText>Forking from {repostName}</StyledHeaderText>}
					<div style={{ marginBottom: 25 }}>
						<StyledLabelText>Name</StyledLabelText>
						<StyledInput
							placeholder="ex: Michael's link"
							onChange={(e) => setShortcutName(e.target.value)}
						/>
					</div>
					<div style={{ marginBottom: 50 }}>
						<StyledLabelText>Links</StyledLabelText>
						<StyledList>
							{links.map((link, index) => (
								<StyledListItem key={link + index}>
									{' '}
									<StyledInput
										onChange={(e) => handleChange(index, e)}
										placeholder="ex: google.com"
									/>
								</StyledListItem>
							))}
						</StyledList>
						<StyledButton
							onClick={() => {
								setLinks([ ...links, { value: null } ]);
							}}
						>
							Add link
						</StyledButton>
					</div>
					<StyledButton onClick={() => setPageState(1)}>Continue</StyledButton>
				</StyledContainer>
			);
			break;
		case 1:
			activeComponent = (
				<StyledContainer>
					<StyledHeaderText>Review your link and sharing settings</StyledHeaderText>
					<ShortcutCard
						style={{ marginBottom: 50 }}
						urls={links.map((link) => link.value)}
						id="0"
						shortcutName={shortcutName}
						macro={null}
						forkName={repostName}
					/>
					<StyledGrayBox style={{ marginBottom: 10 }}>
						<div>
							<StyledCheckbox
								onClick={() => {
									toggleVisibility();
								}}
								type="checkbox"
							/>{' '}
							<label>Make visibility public</label>
						</div>
					</StyledGrayBox>
					{forking ? (
						<StyledButton
							onClick={() => {
								addShortcut({
									links: links.map((link) => link.value),
									name: shortcutName,
									visibility,
									repost_id: repostId,
									post_type: POSTTYPE.DEFAULT,
									callback: (macro) => {
										setMacro(macro);
										setPageState(2);
									}
								});
							}}
						>
							Fork
						</StyledButton>
					) : (
						<StyledButton
							onClick={() => {
								addShortcut({
									links: links.map((link) => link.value),
									name: shortcutName,
									visibility,
									post_type: POSTTYPE.DEFAULT,
									callback: (macro) => {
										setMacro(macro);
										setPageState(2);
									}
								});
							}}
						>
							Create
						</StyledButton>
					)}
				</StyledContainer>
			);
			break;
		case 2:
			const macroBoxRef = React.createRef();
			const macroBox = (
				<StyledGrayTextArea
					ref={macroBoxRef}
					style={{ marginBottom: 10 }}
					value={'http://localhost:3000/' + macro}
				/>
			);
			activeComponent = (
				<StyledContainer>
					<ShortcutCard
						style={{ marginBottom: 25 }}
						urls={links.map((link) => link.value)}
						id="0"
						shortcutName={shortcutName}
						macro={null}
						forkName={repostName}
					/>
					<StyledSubheaderText style={{ marginBottom: 17 }}>Your link has been created:</StyledSubheaderText>
					{macroBox}
					<StyledButton
						onClick={() => {
							const box = macroBox.ref.current;
							console.log(box);
							box.select();
							document.execCommand('copy');
						}}
						style={{ marginBottom: 50 }}
					>
						Copy to clipboard
					</StyledButton>
					<StyledButton
						onClick={() => {
							window.location.href = '/profile';
						}}
					>
						Back to profile
					</StyledButton>
				</StyledContainer>
			);
			break;
	}

	return activeComponent;
};

export default AddShortcutContainer;
