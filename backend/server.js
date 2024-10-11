const express = require('express')
const app = express()
require('dotenv').config();


const PORT = process.env.PORT || 6000
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3002");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./routes/Auth'));
const mongoDB = require('./database');
mongoDB();

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`)
})
