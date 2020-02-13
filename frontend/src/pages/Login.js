import React from 'react';
import { StyledButton, StyledContainer } from '../components/styles';
import lumberFetch from '../lumberfetch';

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
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    console.log(this.state);
    // If logging in and not signing up
    if (this.props.login) {
      lumberFetch.post('http://localhost:5000/login', {
        username,
        password,
      });
    } else {
      const { email, username, password } = this.state;
      console.log(lumberFetch);
      lumberFetch.post('http://localhost:5000/create_user', {
        email,
        username,
        password,
      });
    }
  }

  handleInputChange(e, key) {
    this.setState({ [key]: e.target.value });
  }

  render() {
    const { login } = this.props;
    return (
      <StyledContainer>
        {login ? <h1>Log In</h1> : <h1>Sign up</h1>}
        <div>
          {!login && (
            <>
              {' '}
              <label>Email</label>
              <input
                type="text"
                value={this.state.email}
                onChange={e => this.handleInputChange(e, 'email')}
              />
            </>
          )}
        </div>
        <div>
          <label>User Name</label>
          <input
            type="text"
            value={this.state.username}
            onChange={e => this.handleInputChange(e, 'username')}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Password</label>
          <input
            type="text"
            value={this.state.password}
            onChange={e => this.handleInputChange(e, 'password')}
          />
        </div>
        <StyledButton onClick={this.handleSubmit}>
          {this.props.login ? 'Login' : 'Sign up'}
        </StyledButton>
      </StyledContainer>
    );
  }
}

export default Login;
