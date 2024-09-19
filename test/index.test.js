const request = require('supertest');
const http = require('http');
const server = require('../src/index');  // Ensure your server code is in index.js

describe('Server Endpoints', () => {
  let expect;

  before(async () => {
    const chai = await import('chai'); // Use dynamic import
    expect = chai.expect; // Get the expect function from Chai
  });

  after(() => {
    server.close();  // Close the server after tests
  });

  describe('GET /', () => {
    it('should respond with "Hello Node!"', async () => {
      const response = await request(server).get('/');
      expect(response.statusCode).to.equal(200);  // Use Chai's expect
      expect(response.text).to.equal('Hello Node!\n');  // Use Chai's expect
    });
  });

  describe('GET /status', () => {
    it('should return server status', async () => {
      const response = await request(server).get('/status');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.deep.equal({ status: 'OK' });
    });
  });

  describe('POST /data', () => {
    it('should echo back the posted data', async () => {
      const data = { name: 'Test', value: 42 };
      const response = await request(server)
        .post('/data')
        .send(data)
        .set('Content-Type', 'application/json');

      expect(response.statusCode).to.equal(200);
      expect(response.body).to.deep.equal(data);  // Expect the same data back
    });
  });
});
