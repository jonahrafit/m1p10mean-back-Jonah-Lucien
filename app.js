// app.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const indexRouter = require( './routes/auth' );
const clientRouter = require( './routes/client' );
const employeRouter = require( './routes/employe' );
const managerRouter = require( './routes/manager' );
const serviceRouter = require( './routes/ServiceRouter' );
const verifyToken = require( './service/midlware/JwtFilter' );

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
} ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use( verifyToken )

mongoose.connect('mongodb://' +
  process.env.DB_SERVER + ':' +
  process.env.DB_PORT + '/' +
  process.env.DB_NAME);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log('Connecté à la base de données MongoDB');
});

app.use( '/auth', indexRouter );
app.use( '/clients', clientRouter );
app.use( '/manager', managerRouter );
app.use( '/employees', employeRouter );
app.use( '/services', serviceRouter );

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});


module.exports = app;