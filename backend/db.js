const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/notesDB';

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log('connection established');
    })
}

module.exports = connectToMongo;