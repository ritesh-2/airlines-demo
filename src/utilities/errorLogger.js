const fs = require('fs');
const { logError, getTraceIdHeader } = require('./consoleLogger');

let errorLogger = (err, req, res, next) => {
    fs.appendFile('ErrorLogger.txt', new Date() + " - " + err.stack + "\n", (error) => {
        if (error) console.log("Failed in logging error");
    });
    if (err.status) res.status(err.status)
    else res.status(500);
    res.json({ "message": err.message })
    logError(getTraceIdHeader(req), `Error from airline error logger at ${new Date()} follows :${err}`)
    next();
}

module.exports = errorLogger;