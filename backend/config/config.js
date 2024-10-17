// config.js
const{JWT_EXP,JWT_SEC,MONGO_URL}=process.env
module.exports = {
    JWT_SECRET: JWT_SEC,
    JWT_EXPIRATION: JWT_EXP,
    MONGO_URI: MONGO_URL
};