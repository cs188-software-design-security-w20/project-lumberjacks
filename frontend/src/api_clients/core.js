import lumberFetch from '../lumberfetch';

export const VisibilityType = {
	PRIVATE: 0,
	PUBLIC: 1,
	GLOBAL: 2
};

export const POSTTYPE = {
	DEFAULT: 0,
	REPOST: 1
};

class Core {
	constructor() {}

	addLink({ name, links, visibility, post_type, repost_id }) {
		return lumberFetch.post('add_link', {
			name,
			links: links.join(','),
			visibility,
			post_type,
			repost_id
		});
	}

	getLinks({ shortlink }) {
		return lumberFetch.get(`${shortlink}`);
	}

	getLink(id) {
		return lumberFetch.post('get_link', {
			id
		});
	}

	getGallery() {
		return lumberFetch.get('gallery');
	}

	getFeed(offset, limit, sort) {
		return lumberFetch.get(`feed?offset=${offset}&limit=${limit}`);
	}
}

export default new Core();
