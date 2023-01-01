const fs = require('fs');
const { logInfo, getTraceIdHeader } = require('./consoleLogger');

let requestLogger = (req, res, next) => {
    let logMessage = "" + new Date() + " " + req.method + " " + req.url + "\n";
    fs.appendFile('RequestLogger.txt', logMessage, (err) => {
        if (err) next(err);
    });
    logInfo(getTraceIdHeader(req), logMessage);
    next();

}
module.exports = requestLogger;