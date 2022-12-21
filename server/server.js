const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

// Replace with your mongoLab URI
const DB_USER = encodeURIComponent('nikita');
const PASSWORD = encodeURIComponent('nikita123'); 
const MONGO_URI = `mongodb+srv://${DB_USER}:${PASSWORD}@lyricaldb.bjpnm.mongodb.net/test?retryWrites=true&w=majority`;
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

// const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
                                 
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
