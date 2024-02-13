// app.js
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

var indexRouter = require('./routes/auth');
var clientRouter = require('./routes/client');
var employeRouter = require('./routes/employe');
var managerRouter = require('./routes/manager');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://' +
  process.env.DB_SERVER + ':' +
  process.env.DB_PORT + '/' +
  process.env.DB_NAME);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log('Connecté à la base de données MongoDB');
});

app.use('/auth', indexRouter);
app.use('/client', clientRouter);
app.use('/manager', managerRouter);
app.use('/employe', employeRouter);

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});


module.exports = app;
