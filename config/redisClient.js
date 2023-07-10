const redis = require("redis")
const { REDIS_URL, REDIS_PORT } = require('./config');

const client = redis.createClient({
    url: `redis://${REDIS_URL}:${REDIS_PORT}`,
    legacyMode: true
})

exports.connectRedisClient = async () => {
    await client.connect(console.log('connect redis successfully')).catch(console.error);
}
