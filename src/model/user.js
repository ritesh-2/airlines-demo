const dbModel = require('../utilities/connection');
const { logInfo } = require('../utilities/consoleLogger');

const infyAirlinesDb = {}

infyAirlinesDb.generateBookingId = () => {
    return dbModel.getFlightCollection().then(flightModel => {
        return flightModel.distinct("flights.bookings.bookingId").then(bookingIds => {
            let maxBookingId = Math.max(...bookingIds);
            return maxBookingId + 1;
        })
    })
}

infyAirlinesDb.findSrcDest = () => {
    return dbModel.getFlightCollection().then(flightModel => {
        return flightModel.find({}, { _id: 0, source: 1, destination: 1 }).then(flightData => {
            if (flightData.length > 0) return flightData
            else return null
        })
    })
}

infyAirlinesDb.showFlights = (source, destination, travellersCount, nonStopFlights) => {
    logInfo("Entered infyAirlinesDb.showFlights")
    return dbModel.getFlightCollection().then(flightModel => {
        if (nonStopFlights == "false") {
            return flightModel.aggregate([
                { $unwind: "$flights" },
                { $match: { source: source, destination: destination, "flights.seatsAvailable": { "$gte": Number(travellersCount) } } },
                { $group: { _id: "$_id", source: { "$first": "$source" }, destination: { "$last": "$destination" }, flights: { $push: "$flights" } } },
                { $project: { _id: 0, "flights.bookings": 0 } }])
                .then(flightsData => {
                    if (flightsData.length > 0) return flightsData
                    else return null
                })
        } else {
            return flightModel.aggregate([
                { $unwind: "$flights" },
                { $match: { "flights.stops": 0, source: source, destination: destination, "flights.seatsAvailable": { "$gte": Number(travellersCount) } } },
                { $group: { _id: "$_id", source: { "$first": "$source" }, destination: { "$last": "$destination" }, flights: { $push: "$flights" } } },
                { $project: { _id: 0, "flights.bookings": 0 } }])
                .then(flightsData => {
                    if (flightsData.length > 0) return flightsData
                    else return null
                })
        }

    })
}

infyAirlinesDb.checkUser = (emailId) => {
    return dbModel.getUserCollection().then(userModel => {
        return userModel.findOne({ emailId: emailId }).then(userData => {
            if (userData) return userData;
            else return null;
        })
    })
}

infyAirlinesDb.bookFlight = (tripData, flightId) => {
    return infyAirlinesDb.generateBookingId().then(newBookingId => {
        tripData.bookingId = newBookingId;
        return dbModel.getFlightCollection().then(flightModel => {
            return flightModel.updateOne(
                { "flights.flightId": flightId },
                {
                    $push: { "flights.$.bookings": tripData },
                    $inc: { "flights.$.seatsAvailable": -tripData.noOfTickets }
                }).then(pushSuccess => {
                    if (pushSuccess.nModified > 0) {
                        return dbModel.getUserCollection().then(userModel => {
                            return userModel.updateOne(
                                { "emailId": tripData.emailId },
                                {
                                    $push: { bookings: { bookingId: newBookingId, status: 'Confirmed' } },
                                    $inc: { walletAmount: -tripData.bookingCost }
                                }).then(userUpdated => {
                                    if (userUpdated.nModified > 0) {
                                        return newBookingId
                                    } else return null;
                                })
                        })
                    } else return null;
                })
        })

    })
}


infyAirlinesDb.fetchBookings = (emailId) => {
    return dbModel.getUserCollection().then(userModel => {
        return userModel.findOne({ emailId: emailId }, { bookings: 1, _id: 0 }).then(bookingData => {
            if (bookingData.bookings.length > 0) return bookingData.bookings;
            else return null;
        })
    })
}

infyAirlinesDb.fetchBookingDetails = (bookingId) => {
    return dbModel.getFlightCollection().then(flightModel => {
        return flightModel.findOne({ "flights.bookings.bookingId": bookingId }).then(data => {
            // console.log(data)
            return data
        })
    })
}

// infyAirlinesDb.cancelBookingByPassenger = (bookingId, passengerName) => {
//     return dbModel.getFlightCollection().then(flightModel => {
//         return flightModel.updateOne({
//             "flights.bookings.passengerDetails.passengerName": passengerName,
//             "flights.bookings.bookingId": bookingId
//         }, { $set: { "flights.$.bookings.$.passengerDetails.$.bookingStatus": "Cancelled" } })
//     })
// }

module.exports = infyAirlinesDb;