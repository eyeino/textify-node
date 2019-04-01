const SpotifyWebApi = require('spotify-web-api-node');
const dotenv = require('dotenv');

dotenv.config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

async function findTrack(artistQuery) {
  try {
    const tokenData = await spotifyApi.clientCredentialsGrant()
    spotifyApi.setAccessToken(tokenData.body.access_token);

    const artistResults = await spotifyApi.searchArtists(artistQuery);
    const artist = artistResults.body.artists.items[0];

    const topTracksResults = await spotifyApi.getArtistTopTracks(artist.id, "US");
    const topTrack = (topTracksResults.body.tracks[0]);

    return {
      artistName: artist.name,
      trackName: topTrack.name,
      trackLink: topTrack.external_urls.spotify,
      albumName: topTrack.album.name,
      albumImgUrl: topTrack.album.images[0].url
    }

  } catch(err) {

    return {
      artistName: null,
      trackName: null,
      trackLink: null,
      albumName: null,
      albumImgUrl: null
    }
  }
}

module.exports = findTrack;