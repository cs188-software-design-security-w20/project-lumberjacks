import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AddShortcutContainer from './components/AddShortcutContainer';
import ProfileContainer from './components/ProfileContainer';
import FeedContainer from './components/FeedContainer';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const App = () => {
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
        </Nav>
      </Navbar>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/addShortcut" component={AddShortcutContainer} />
        <Route path="/profile" component={ProfileContainer} />
        <Route path="/feed" component={FeedContainer} />
      </Switch>
    </Router>
  );
};

export default App;
