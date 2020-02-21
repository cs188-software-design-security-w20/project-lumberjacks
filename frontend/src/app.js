import React, { useEffect, useState } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import Home from './pages/Home';
import AddShortcutContainer from './components/AddShortcutContainer';
import ProfileContainer from './components/ProfileContainer';
import FeedContainer from './components/FeedContainer';
import ShortlinkRedirectContainer from './components/ShortlinkRedirectContainer';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';

import Auth from './api_clients/auth';

const App = () => {
	const history = useHistory();
	const [ isLoggedIn, setLoggedIn ] = useState(true);
	const [ user, setUser ] = useState(null);

	async function authUser() {
		const data = await Auth.auth();
		console.log(data);
		if (!data['error']) {
			setLoggedIn(true);
			setUser(data.name);
		} else {
			setLoggedIn(false);
		}
	}

	async function logout() {
		await Auth.logout();
		await authUser();
		history.push('/');
	}

	useEffect(async () => await authUser(), []);

	return (
		<Router>
			<Navbar>
				<NavbarBrand href="/">home</NavbarBrand>
				<Nav>
					<NavItem>
						<NavLink href="/addShortcut">Add shortcut</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="/profile">Profile</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="/feed">Feed</NavLink>
					</NavItem>
					{!isLoggedIn && (
						<NavItem>
							<NavLink href="/login">Sign in</NavLink>
						</NavItem>
					)}
					{isLoggedIn && (
						<NavItem>
							<NavLink onClick={() => logout()}>Sign out</NavLink>
						</NavItem>
					)}
				</Nav>
			</Navbar>

			<Switch>
				<Route exact path="/">
					{isLoggedIn ? <Redirect to="/feed" /> : <Home authUser={authUser} history={history} />}
				</Route>
				<Route path="/login">
					<Home authUser={authUser} history={history} />
				</Route>
				<Route path="/addShortcut">{isLoggedIn ? <AddShortcutContainer /> : <Redirect to="/" />}</Route>
				<Route path="/profile"> {isLoggedIn ? <ProfileContainer /> : <Redirect to="/" />}</Route>
				<Route path="/feed">
					<FeedContainer />
				</Route>
				<Route path="/:shortlink" children={<ShortlinkRedirectContainer />} />
			</Switch>
		</Router>
	);
};

export default App;
