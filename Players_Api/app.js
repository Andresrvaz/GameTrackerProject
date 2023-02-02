const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/users');
const { MONGO_DB, MONGO_DB_TEST, NODE_ENV } = process.env;

const connectionString = NODE_ENV === 'production' ? MONGO_DB : MONGO_DB_TEST;

mongoose.set('strictQuery', false);
const app = express();

app.use(bodyParser.json());

app.use('/api', userRoutes);

mongoose.connect(connectionString).catch((err) => console.log(err));

const server = app.listen(process.env.PORT);

module.exports = { app, server };
