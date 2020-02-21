import React, { useEffect, useState } from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from 'react-router-dom';
import Home from './pages/Home';
import AddShortcutContainer from './pages/AddShortcut';
import ProfileContainer from './pages/Profile';
import FeedContainer from './pages/Feed';
import ShortlinkRedirectContainer from './components/ShortlinkRedirectContainer';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';

import Auth from './api_clients/auth';

const App = () => {
  const history = useHistory();
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [user, setUser] = useState(null);

  async function authUser() {
    const data = await Auth.auth();
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

  useEffect(() => {
    (async () => await authUser())();
  }, []);

  const navItemStyle = {
    color: 'rgba(0,0,0, .8)',
    textDecoration: 'none',
    fontFamily: 'sans-serif',
    fontSize: '1rem',
    cursor: 'pointer',
    marginRight: '24px',
    maxWidth: '100%',
  };

  document.body.style.backgroundColor = '#f9f9f9';
  document.body.style.margin = 0;

  return (
    <Router>
      <Navbar
        style={{
          padding: 20,
          width: '100%',
          boxSizing: 'border-box',
          borderBottom: '.5px lightgray solid',
        }}
      >
        <Nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: '30%',
            color: 'black',
            listStyleType: 'none',
            padding: 0,
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <NavItem>
            <NavLink style={navItemStyle} href="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink style={navItemStyle} href="/addShortcut">
              Add shortcut
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink style={navItemStyle} href="/profile">
              Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink style={navItemStyle} href="/feed">
              Feed
            </NavLink>
          </NavItem>
          {!isLoggedIn && (
            <NavItem>
              <NavLink style={navItemStyle} href="/login">
                Sign in
              </NavLink>
            </NavItem>
          )}
          {isLoggedIn && (
            <NavItem>
              <NavLink
                style={navItemStyle}
                onClick={() => logout()}
                href="/login"
              >
                Sign out
              </NavLink>
            </NavItem>
          )}
        </Nav>
      </Navbar>

      <Switch>
        <Route exact path="/">
          {isLoggedIn ? (
            <Redirect to="/feed" />
          ) : (
            <Home authUser={authUser} history={history} />
          )}
        </Route>
        <Route path="/login">
          <Home authUser={authUser} history={history} />
        </Route>
        <Route path="/addShortcut">
          {isLoggedIn ? <AddShortcutContainer /> : <Redirect to="/" />}
        </Route>
        <Route path="/profile">
          {' '}
          {isLoggedIn ? <ProfileContainer /> : <Redirect to="/" />}
        </Route>
        <Route path="/feed">
          <FeedContainer />
        </Route>
        <Route path="/:shortlink" children={<ShortlinkRedirectContainer />} />
      </Switch>
    </Router>
  );
};

export default App;
