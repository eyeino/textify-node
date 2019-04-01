const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');

const findTrack = require('./findTrack');
const textTrack = require('./textTrack');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

// load environment vars from .env
dotenv.config()

server.post('/', async (req, res) => {
  if (!req.body.hasOwnProperty('phoneNumber') || 
      !req.body.hasOwnProperty('artistQuery')) {
    res.sendStatus(400); return
  }

  let textSuccess = false;
  
  try {
    const { trackName, trackLink, artistName,
      albumName, albumImgUrl } = await findTrack(req.body.artistQuery);

    if (artistName && trackName && trackLink) {
      textTrack(artistName, trackName,
        trackLink, req.body.phoneNumber)
  
      // TODO: Make success value depend on Twilio Callback URL feature
      textSuccess = true;

    } else {
      res.sendStatus(400); return
    }

    const jsonOut = {
      trackName,
      trackLink,
      artistName,
      albumName,
      albumImgUrl,
      textSuccess
    }

    console.log('Sending:', jsonOut)
    res.json(jsonOut);
    return

  } catch (err) {
    res.sendStatus(500); return
  }
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

module.exports = server;