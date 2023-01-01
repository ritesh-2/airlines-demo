const express = require('express');
const app = express();
require('dotenv').config();
const router = require('./routes/routing');
const bodyParser = require('body-parser');
const cors = require('cors');
const requestLogger = require('./utilities/requestLogger');
const errorLogger = require('./utilities/errorLogger');
const database = require('./model/setupdb');
const consoleLogger = require('./utilities/consoleLogger')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(consoleLogger.addTraceId)
app.use(requestLogger);
app.use('/', router);

app.get('/setupdb', (req, res, next) => {
    database.setupdb().then(data => {
        res.json(data)
    }).catch(err => next(err))
})
// test commit
app.use(errorLogger);

app.listen(process.env.PORT);
console.log('server started at ' + process.env.PORT);

