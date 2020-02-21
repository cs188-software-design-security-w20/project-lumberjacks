import lumberFetch from '../lumberfetch';

class Auth {
	constructor() {}

	login({ emailOrUsername, password }) {
		return lumberFetch.post('login', {
			email: emailOrUsername,
			username: emailOrUsername,
			password,
			remember: true // temporary
		});
	}

	auth() {
		return lumberFetch.get('auth', {});
	}

	logout() {
		return lumberFetch.post('logout', {});
	}
}

export default new Auth();
