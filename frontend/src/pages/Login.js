import React from 'react';
import {
  StyledButton,
  StyledContainer,
  StyledInput,
  StyledSubheaderText,
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
      const data = await Auth.login({ emailOrUsername: username, password });
      if (!data.error) {
        // this.props.history.push('/feed');
        window.location.href = '/';
      } else {
        this.setState(prevState => ({ ...prevState, error: data.error }));
      }
    } else {
      User.createUser({
        email,
        username,
        password,
      });
      window.location.href = '/';
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
                style={{ marginTop: '4px' }} //TODO: Remove
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
            style={{ marginTop: '4px' }} //TODO: Remove
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
        {this.props.children}
        <StyledSubheaderText
          style={{ color: 'red', fontSize: '1rem', marginTop: 10 }}
        >
          {this.state.error}
        </StyledSubheaderText>
      </StyledContainer>
    );
  }
}

export default Login;
