import Redis from "ioredis"
import "dotenv/config"

const redis = new Redis(process.env.UPSTASH_REDIS_URL);

redis.on("ready",()=>{
    console.log("Redis is ready");
})

export default redis;