const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8000;

app.use(cors({
  origin: process.env.VITE_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL)
.then(e => console.log('mongodb connected'))
.catch((err) => console.error("MongoDB connection error:", err));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})