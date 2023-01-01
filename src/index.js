const express = require('express');
const app = express();
const router = require('./routes/routing');
const bodyParser = require('body-parser');
const cors = require('cors');
const requestLogger = require('./utilities/requestLogger');
const errorLogger = require('./utilities/errorLogger');
const database = require('./model/setupdb');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(requestLogger);
app.use('/', router);

app.get('/setupdb', (req, res, next) => {
    database.setupdb().then(data => {
        res.json(data)
    }).catch(err => next(err))
})

app.use(errorLogger);

// app.listen(process.env.PORT || 4000);
// console.log('server started at ' + process.env.PORT || 4000);


app.listen(4000);
console.log('server started at ' + 4000);