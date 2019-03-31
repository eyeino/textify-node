const twilio = require('twilio');
const dotenv = require('dotenv');
dotenv.config()

const twilioClient = new twilio(process.env.TWILIO_ACCOUNT_SID, 
                                process.env.TWILIO_AUTH_TOKEN);
const twilioFromNumber = process.env.TWILIO_FROM_PHONE_NUMBER;

const textTrack = (artistName, trackName, trackLink, phoneNumber) => {
  const body = `${artistName}'s top track is ${trackName}! Link: ${trackLink}`;

  twilioClient.api.account.messages.create({
    from: twilioFromNumber,
    to: phoneNumber,
    body: body
  });

  return `Texted number: ${phoneNumber}, with body: ${body}`;
};

module.exports = textTrack;