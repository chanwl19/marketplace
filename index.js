const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoute = require('./routes/products');

const MONGODB_URI =
  'mongodb+srv://newuser:PAss1234567890@cluster0.zuqxwi9.mongodb.net/Marketplace?retryWrites=true&w=majority&appName=Cluster0';

const app = express();
const port = 8080;

app.use(bodyParser.json()); 
app.use('/api/products', productRoute);
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(
    MONGODB_URI
  )
  .then(result => {
    app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    })
  })
  .catch(err => console.log(err));


