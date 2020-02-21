import React from 'react';
import FeedContainer from '../components/FeedContainer';
import Login from './Login';

const Home = (props) => {
	return (
		<div>
			<Login login={true} authUser={props.authUser} />
			<Login login={false} />
		</div>
	);
};

export default Home;
