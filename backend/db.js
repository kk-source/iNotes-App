const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.mongoURI;

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log('connection established');
    })
}

module.exports = connectToMongo;