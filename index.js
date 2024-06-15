const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoute = require('./routes/products');

const MONGODB_URI =
  'mongodb+srv://newuser:PAss1234567890@cluster0.zuqxwi9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Marketplace';

const app = express();
const port = 3222 ;

app.use(bodyParser.json()); 
app.use('/api/products', productRoute);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})

mongoose
  .connect(
    MONGODB_URI
  )
  // .then(result => {
  //   app.listen(port, () => {
  //     console.log(`Listening on http://localhost:${port}`);
  //   })
  // })
  .catch(err => console.log(err));

  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  })