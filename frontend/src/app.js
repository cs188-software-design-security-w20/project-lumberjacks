import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AddShortcutContainer from './components/AddShortcutContainer';
import ViewShortcutContainer from './components/ViewShortcutContainer';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const App = () => {
  return (
    <Router>
      <Navbar>
        <NavbarBrand href="/">home</NavbarBrand>
        <Nav>
          <NavItem>
            <NavLink href="/addShortcut">add shortcut</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/viewShortcut">view shortcut</NavLink>
          </NavItem>
        </Nav>
      </Navbar>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/addShortcut" component={AddShortcutContainer} />
        <Route path="/viewShortcut" component={ViewShortcutContainer} />
      </Switch>
    </Router>
  );
};

export default App;
