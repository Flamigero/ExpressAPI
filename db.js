const mongoose = require('mongoose');

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env;

const options = {
    useNewUrlParser: true,
    //reconnectTries: Number.MAX_VALUE,
    //reconnectInterval: 500,
    //connectTimeoutMS: 10000,
    useUnifiedTopology: true
};

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

const dbConnection = async () => {
    mongoose.connect(url, options).then(() => {
        console.log('MongoDB is connected');
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports = {
    dbConnection
}