const { v4 } = require("uuid");

const consoleLogger = {};

consoleLogger.logInfo = (traceId, logObject) => {
    if (process.env.INFO_LOGGING === "true") {
        let currentTime = new Date();
        let logMsg = `${currentTime} --> Trace ID : ${traceId} --> ${logObject}`
        console.log(logMsg);
    }
}
consoleLogger.logError = (traceId, logObject) => {
    if (process.env.ERROR_LOGGING === "true") {
        let currentTime = new Date();
        let logMsg = `${currentTime} --> Trace ID : ${traceId} --> ${logObject}`
        console.log(logMsg);
    }
}

consoleLogger.addTraceId = (req, res, next) => {
    try {
        if (req) {
            let uuid = v4();
            if (!req.headers['Trace-ID']) {
                req.headers['Trace-ID'] = uuid;
            }
            next();
        }
    }
    catch (ex) {
        console.log("Error occured in trace id attatchment");
        next();
    }
}

consoleLogger.getTraceIdHeader = (req) => {
    if (req && req.headers && req.headers['Trace-ID']) {
        return req.headers['Trace-ID']
    }
    else {
        console.log("Trace ID not present in headers");
        return "";
    }
}



module.exports = consoleLogger;