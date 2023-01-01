const express = require('express');
const router = express.Router();
const infyAirlinesServ = require('../service/user');
const { logInfo, getTraceIdHeader } = require('../utilities/consoleLogger');
const { v4: uuidv4, v4 } = require('uuid')

router.get('/showFlights/:source/:destination/:travellersCount/:nonStopFlights', (req, res, next) => {

    let traceId = getTraceIdHeader(req);
    let src = req.params.source;
    let dest = req.params.destination;
    let travellersCount = req.params.travellersCount;
    let nonStopFlights = req.params.nonStopFlights;
    infyAirlinesServ.showFlights(src, dest, travellersCount, nonStopFlights, traceId).then(flightsAvailable => {
        logInfo(traceId, "Response returned sucessfully")
        res.send(flightsAvailable);
    }).catch(err => next(err));
})

router.get('/srcDest', (req, res, next) => {
    let traceId = getTraceIdHeader(req);
    infyAirlinesServ.findSrcDest(traceId).then(servingLocations => {
        logInfo(traceId, "Response returned sucessfully")
        res.send(servingLocations)
    }).catch(err => next(err));
})

router.post('/login', (req, res, next) => {
    let traceId = getTraceIdHeader(req);
    let userData = req.body;
    infyAirlinesServ.login(userData,traceId).then(authenticatedUser => {
        logInfo(traceId, "Response returned sucessfully")
        res.json(authenticatedUser)
    }).catch(err => next(err));
})

router.put('/bookFlight/:flightId', (req, res, next) => {
    let traceId = getTraceIdHeader(req);
    let tripData = req.body;
    let flightId = req.params.flightId;
    infyAirlinesServ.bookFlight(tripData, flightId,traceId).then(bookingId => {
        logInfo(traceId, "Response returned sucessfully")
        res.json({ "message": "Booking Successfull! You can track your booking with Id: " + bookingId })
    }).catch(err => next(err));
})

router.get('/fetchBookings/:emailId', (req, res, next) => {
    let traceId = getTraceIdHeader(req);
    infyAirlinesServ.fetchBookings(req.params.emailId).then(bookingData => {
        logInfo(traceId, "Response returned sucessfully")
        res.json(bookingData)
    }).catch(err => next(err));
})

router.get('/fetchBookingDetails/:bookingId', (req, res, next) => {
    let traceId = getTraceIdHeader(req);
    infyAirlinesServ.fetchBookingDetails(req.params.bookingId).then(bookingDetails => {
        logInfo(traceId, "Response returned sucessfully")
        res.json(bookingDetails);
    }).catch(err => next(err))
})

module.exports = router;