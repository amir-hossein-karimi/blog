const redis = require("redis");

const redisClient = redis.createClient();
redisClient.connect();
redisClient.on("connect", () => console.log("redis connect"));
redisClient.on("ready", () => console.log("redis is ready"));
redisClient.on("error", (err) => console.log("redis connection failed", err));

module.exports = redisClient;
