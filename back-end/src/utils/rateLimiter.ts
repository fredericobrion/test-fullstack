import { rateLimit } from "express-rate-limit";

const MINUTES = 15;
const REQUESTS = 100;

const limiter = rateLimit({
  windowMs: MINUTES * 60 * 1000,
  max: REQUESTS,
  message: "Too many requests",
});

export default limiter;
