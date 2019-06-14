/* eslint-disable strict */

const app = require('../src/app');

describe('App', () => {
  it('GET / responds with 200 containing "Hello, server and boilerplate!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, [
        {
          id: 1,
          title: 'Bookmark 1',
          rating: 3,
          url: 'google.com',
          desc: 'search engine',
        }
      ]);
  });
});