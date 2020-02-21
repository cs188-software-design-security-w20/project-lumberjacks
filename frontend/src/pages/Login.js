import React from 'react';
import {
  StyledButton,
  StyledContainer,
  StyledInput,
} from '../components/styles';
import User from '../api_clients/user';
import Auth from '../api_clients/auth';

// need to add logic to validate credentials & log in if valid; reject if invalid (inside handleSubmit)

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
    };

    // handle form submissions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStyledInputChange = this.handleStyledInputChange.bind(this);
  }

  async handleSubmit(e) {
    const { email, username, password } = this.state;
    // If logging in and not signing up
    if (this.props.login) {
      await Auth.login({ emailOrUsername: username, password });
      await this.props.authUser();
      window.location.href = '/feed';
    } else {
      User.createUser({
        email,
        username,
        password,
      });
    }
  }

  handleStyledInputChange(e, key) {
    this.setState({ [key]: e.target.value });
  }

  render() {
    const { login } = this.props;
    return (
      <StyledContainer style={{ marginBottom: 50 }}>
        {login ? (
          <h1 style={{ marginBottom: 10 }}>Log In</h1>
        ) : (
          <h1 style={{ marginBottom: 10 }}>Sign up</h1>
        )}
        <div>
          {!login && (
            <>
              {' '}
              <label>Email</label>
              <StyledInput
                type="text"
                value={this.state.email}
                onChange={e => this.handleStyledInputChange(e, 'email')}
              />
            </>
          )}
        </div>
        <div>
          <label>User Name</label>
          <StyledInput
            type="text"
            value={this.state.username}
            onChange={e => this.handleStyledInputChange(e, 'username')}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Password</label>
          <StyledInput
            type="password"
            value={this.state.password}
            onChange={e => this.handleStyledInputChange(e, 'password')}
          />
        </div>
        <StyledButton
          style={{ backgroundColor: '#3e3aff', color: 'white' }}
          onClick={this.handleSubmit}
        >
          {this.props.login ? 'Login' : 'Sign up'}
        </StyledButton>
      </StyledContainer>
    );
  }
}

export default Login;
