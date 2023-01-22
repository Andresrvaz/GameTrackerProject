const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const matchRoutes = require('./routes/matches');

mongoose.set('strictQuery', false);

const app = express();

app.use(bodyParser.json());

app.use('/api', matchRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/matchesDB')
        .then(() => {app.listen(8090)})
        .catch(err => console.log(err));