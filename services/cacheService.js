const redisClient = require("../config/redis");

const cacheService = {
     setCache: async (key, value , expiryInSec = 600) => {
        try {
            await redisClient.setEx(key, expiryInSec, JSON.stringify(value));
        } catch (error) {
            console.log(error);
            return null;
        }
     },
     getCache: async (key) => {
        console.log("get cached")
        try {
            const value = await redisClient.get(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.log(error);
            return null;
        }
     },
     deleteCache: async (key) => {
        try {
            await redisClient.del(key);
        } catch (error) {
            console.log(error);
            return null;
        }
     }
}

module.exports = {cacheService}
