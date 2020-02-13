import lumberFetch from '../lumberfetch';

class User {
  constructor() {}

  createUser({ email, username, password }) {
    return lumberFetch.post('create_user', { email, username, password });
  }
}

export default new User();
