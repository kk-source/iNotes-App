const connect = require('./db');
connect();
const cors=require("cors");
const express = require('express')
const app = express()
const port = 5000

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.json());

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js'));

app.get('/', (req, res) => {
  res.send('Kartik singh kushwah!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})