const express = require('express');
const dotenv = require('dotenv');

const server = express();
server.use(express.json());

// load environment vars from .env
dotenv.config()

server.post('/', (req, res, next) => {
  if (!req.body.hasOwnProperty('phoneNumber') || 
      !req.body.hasOwnProperty('artistQuery')) {
    res.sendStatus(400);
    return
  }

  let textSuccess = false;
  let trackName, artistName, albumName, albumImgUrl;
  trackName = artistName = albumName = albumImgUrl = null;
  
  // TODO: get search results from spotify
    // set track, etc vars

  // TODO: text results to phone number with twilio
    // set textSuccess to true

  const jsonOut = {
    trackName,
    artistName,
    albumName,
    albumImgUrl,
    textSuccess
  }
  res.json(jsonOut);
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

module.exports = server;