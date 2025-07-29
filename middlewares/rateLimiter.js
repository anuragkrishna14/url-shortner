const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1*60*1000, // 1 minutes or 1*60*1000milliseconds
  limit: 10, // Limit each IP to 10 requests per window(here, per 1 minute)
});

module.exports = limiter;