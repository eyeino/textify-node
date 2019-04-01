const redis = require('redis');
const { RateLimiterRedis } = require('rate-limiter-flexible');
const dotenv = require('dotenv');

dotenv.config();

const redisClient = redis.createClient(process.env.REDIS_URL);

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 10, // if you make more than 25 requests
  duration: 60 * 60 * 24, // per day
  blockDuration: 60 * 60 * 24 * 365 // you're banned for a year
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.sendStatus(429);
    });
};

module.exports = rateLimiterMiddleware;