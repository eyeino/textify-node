const chai = require('chai');
const expect = chai.expect;
const server = require('../server');

chai.use(require('chai-http'));
chai.use(require('chai-json'));

describe("Textify", () => {
  describe("Server response", () => {
    it('res with json to req with valid json', () => {
      chai.request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .send({
        phoneNumber: '1234567890',
        artistQuery: 'toro y moi'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      })
    });
    it('res with 400 error if req body is missing parameters', () => {
      chai.request(server)
      .post('/')
      .send('something invalid')
      .end((err, res) => {
        expect(res).to.have.status(400);
      })
    });
  });
  
  describe("Texting", () => {
    it('successfully sends a message via SMS', () => {
      
    })
  });

  describe("Searching on Spotify", () => {
    it('finds an artist based on a search query', () => {

    });
  })
})