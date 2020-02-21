import lumberFetch from '../lumberfetch';

export const VisibilityType = {
  PRIVATE: 0,
  PUBLIC: 1,
  GLOBAL: 2,
};

export const POSTTYPE = {
  DEFAULT: 0,
  REPOST: 1,
};

class Core {
  constructor() {}

  addLink({ name, links, visibility, post_type, repost_id }) {
    return lumberFetch.post('add_link', {
      name,
      links: links.join(','),
      visibility,
      post_type,
      repost_id,
    });
  }

  getLinks({ shortlink }) {
    return lumberFetch.get(`${shortlink}`);
  }

  getGallery() {
    return lumberFetch.get('gallery');
  }

  getFeed() {
    return lumberFetch.get('feed');
  }
}

export default new Core();
