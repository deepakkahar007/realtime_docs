import { Redis } from "ioredis";

export const redis = new Redis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  lazyConnect: true,
  retryStrategy(times) {
    return Math.min(times * 50, 2000);
  },
  reconnectOnError() {
    return true;
  },
});
