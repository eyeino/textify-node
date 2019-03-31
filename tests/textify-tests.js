const chai = require('chai');
const expect = chai.expect;

describe("Textify", () => {
  const twilioMagicSuccessful = '+15005550006';

  describe("Server response", () => {
    
    chai.use(require('chai-http'));
    chai.use(require('chai-json'));

    const server = require('../server');

    it('res with json data to req with json', () => {
      chai.request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .send({
        phoneNumber: twilioMagicSuccessful,
        artistQuery: 'toro y moi'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.have.deep.property('artistName', 'Toro Y Moi');
      })
    });

    it('res with 400 error if spotify search does not find result', () => {
      chai.request(server)
      .post('/')
      .set('Content-Type', 'application/json')
      .send({
        phoneNumber: twilioMagicSuccessful,
        artistQuery: 'lkadslkjfalsdafsdkldfkasf'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
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
    it('sends a message via SMS', () => {
      const textTrack = require('../textTrack');
      expect(textTrack('Toro Y Moi', 'Ordinary Pleasure', 'some-link', twilioMagicSuccessful))
      .to.be.a('string').that.includes('Toro Y Moi');
    })
  });

  describe("Searching on Spotify", () => {
    chai.use(require('chai-as-promised'));
    const findTrack = require('../findTrack');

    it('finds an artist/track based on a search query', () => {
      expect(findTrack('toro y moi')).to.eventually.include({ artistName: 'Toro Y Moi' })
    });

    it('returns null object when no artist/track found', () => {
      expect(findTrack('zzkjhfalkdshflkasjhdhlfdl')).to.eventually.include({ artistName: null })
    })
  })
})