const express = require('express');
const bodyParser = require('body-parser');

const populateRoutes = require('./routes/populate');

const app = express();

app.use(bodyParser.json());

app.use('/api', populateRoutes);

app.listen(8095, () => {});
