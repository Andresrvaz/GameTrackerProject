const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');

mongoose.set('strictQuery', false);
const app = express();

app.use(bodyParser.json());

app.use('/api', userRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/playersDB');

const server = app.listen(8080);

module.exports = { app, server };
