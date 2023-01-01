const express = require('express');
const router = express.Router();
const infyAirlinesServ = require('../service/user');

router.get('/showFlights/:source/:destination/:travellersCount/:nonStopFlights', (req, res, next) => {
    let src = req.params.source;
    let dest = req.params.destination;
    let travellersCount = req.params.travellersCount;
    let nonStopFlights = req.params.nonStopFlights;
    infyAirlinesServ.showFlights(src, dest, travellersCount, nonStopFlights).then(flightsAvailable => {
        res.send(flightsAvailable);
    }).catch(err => next(err));
})

router.get('/srcDest', (req, res, next) => {
    infyAirlinesServ.findSrcDest().then(servingLocations => {
        res.send(servingLocations)
    }).catch(err => next(err));
})

router.post('/login', (req, res, next) => {
    let userData = req.body;
    infyAirlinesServ.login(userData).then(authenticatedUser => {
        res.json(authenticatedUser)
    }).catch(err => next(err));
})

router.put('/bookFlight/:flightId', (req, res, next) => {
    let tripData = req.body;
    let flightId = req.params.flightId;
    infyAirlinesServ.bookFlight(tripData, flightId).then(bookingId => {
        res.json({ "message": "Booking Successfull! You can track your booking with Id: " + bookingId })
    }).catch(err => next(err));
})

router.get('/fetchBookings/:emailId', (req, res, next) => {
    infyAirlinesServ.fetchBookings(req.params.emailId).then(bookingData => {
        res.json(bookingData)
    }).catch(err => next(err));
})

router.get('/fetchBookingDetails/:bookingId', (req, res, next) => {
    infyAirlinesServ.fetchBookingDetails(req.params.bookingId).then(bookingDetails => {
        res.json(bookingDetails);
    }).catch(err => next(err))
})

module.exports = router;