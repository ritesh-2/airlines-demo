const infyAirlinesDb = require('../model/user');

const infyAirlinesServ = {}


infyAirlinesServ.login = (userData) => {
    return infyAirlinesDb.checkUser(userData.emailId).then(authenticatedUser => {
        if (!authenticatedUser) {
            let err = new Error(`${userData.emailId} is not registered`);
            err.status = 404;
            throw err;
        } else {
            if (authenticatedUser.password != userData.password) {
                let err = new Error(`Invalid Credentials`);
                err.status = 400;
                throw err;
            } else {
                return authenticatedUser;
            }
        }
    })
}

infyAirlinesServ.findSrcDest = () => {
    return infyAirlinesDb.findSrcDest().then(srcDestData => {
        if (srcDestData) {
            let sourceArray = srcDestData.map(element => element.source)
            let destinationArray = srcDestData.map(element => element.destination)
            let srcDestObj = { sourceArray: sourceArray, destinationArray: destinationArray }
            return srcDestObj;
        }
        else {
            let err = new Error(`Something went wrong!! we will get Back to you Soon!!`);
            err.status = 404;
            throw err;
        }
    })
}

infyAirlinesServ.showFlights = (source, destination, travellersCount, nonStopFlights) => {
    return infyAirlinesDb.showFlights(source, destination, travellersCount, nonStopFlights).then(availableFlights => {
        if (availableFlights) return availableFlights
        else {
            let err = new Error(`Sorry!! No Flight Available for Booking`);
            err.status = 404;
            throw err;
        }
    })
}

infyAirlinesServ.bookFlight = (tripData, flightId) => {
    return infyAirlinesDb.bookFlight(tripData, flightId).then(response => {
        return response
    })
}


infyAirlinesServ.fetchBookings = (emailId) => {
    return infyAirlinesDb.fetchBookings(emailId).then(bookingData => {
        return bookingData
    })
}

infyAirlinesServ.fetchBookingDetails = (bookingId) => {
    return infyAirlinesDb.fetchBookingDetails(bookingId).then(bookingData => {
        if (bookingData) {
            let newBookingObj = {};
            newBookingObj.source = bookingData.source;
            newBookingObj.destination = bookingData.destination;
            bookingData.flights.map(flight => {
                let myFlight = flight.bookings.find(booking => {
                    if (booking.bookingId == bookingId) newBookingObj.bookings = booking
                    return booking.bookingId == bookingId
                })
                if (myFlight) {
                    newBookingObj.flightId = flight.flightId;
                    newBookingObj.flightStatus = flight.flightStatus;
                    newBookingObj.airlinesName = flight.airlinesName;
                    newBookingObj.departureTime = flight.departureTime;
                    newBookingObj.arrivalTime = flight.arrivalTime;
                    newBookingObj.stops = flight.stops;
                }
            })
            return newBookingObj;
        } else {
            return null;
        }

    })
}


infyAirlinesServ.bookFlight = (tripData, flightId) => {
    return infyAirlinesDb.bookFlight(tripData, flightId).then(bookingId => {
        if (bookingId) return bookingId
        else {
            let err = new Error("Booking Failed");
            err.status = 404;
            throw err;
        }
    })
}




module.exports = infyAirlinesServ;