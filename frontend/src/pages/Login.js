import React from 'react';

// need to add logic to validate credentials & log in if valid; reject if invalid (inside handleSubmit)

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    // handle form submissions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
    console.log('You logged in!');
  }

  handleUserNameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <label>User Name</label>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleUserNameChange}
          />
          <label>Password</label>
          <input
            type="text"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
