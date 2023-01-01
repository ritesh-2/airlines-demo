const connection = require('../utilities/connection');

let today = new Date();
let day = today.getDate();
let month = today.getMonth();
let year = today.getFullYear()

const userData = [
    {
        emailId: "tom123@gmail.com",
        password: "tom@1234",
        userName: "Tom",
        walletAmount: 0,
        userType: "Platinum",
        bookings: [
            {
                bookingId: 2001,
                status: 'Confirmed'
            }
        ]
    },
    {
        emailId: "maria10@gmail.com",
        password: "maria_10",
        userName: "Maria",
        walletAmount: 7890,
        userType: "Platinum",
        bookings: [
            {
                bookingId: 2005,
                status: 'Modified'
            }
        ]
    },
    {
        emailId: "John94@gmail.com",
        password: "john_usa94",
        userName: "John",
        walletAmount: 21000,
        userType: "Gold",
        bookings: [
            {
                bookingId: 2003,
                status: 'Confirmed'
            }
        ]
    },
    {
        emailId: "steve_12@gmail.com",
        password: "steve@uk12",
        userName: "Steve",
        walletAmount: 45300,
        userType: "Silver",
        bookings: []
    },
    {
        emailId: "jack89@yahoo.com",
        password: "jack@usa89",
        userName: "Jack",
        walletAmount: 24500,
        userType: "Silver",
        bookings: [
            {
                bookingId: 2002,
                status: 'Confirmed'
            },
            {
                bookingId: 2006,
                status: 'Confirmed'
            }
        ]
    }
]

let flightData = [
    {
        source: "Bengaluru",
        destination: "Delhi",
        flights: [
            {
                flightId: "I5-2878",
                flightStatus: "Running",
                airlinesName: "Air Asia",
                departureTime: new Date("01-01-01 06:15").toLocaleTimeString(),
                arrivalTime: new Date("01-01-01 08:45").toLocaleTimeString(),
                seatsAvailable: 96,
                fare: [{ travelClass: "Economy", baseFare: 4485 }, { travelClass: 'Business', baseFare: 9485 }],
                stops: 0,
                bookings: [
                    {
                        emailId: "tom123@gmail.com",
                        bookingId: 2001,
                        bookingCost: 13455,
                        travelBookingClass: "Economy",
                        departureDate: new Date(year, month - 1, day - 5),
                        noOfTickets: 3,
                        ticketStatus: "Confirmed",
                        passengerDetails: [
                            {
                                passengerName: "John",
                                passengerAge: 45,
                                gender: 'Male',
                                bookingStatus: 'Confirmed'
                            },
                            {
                                passengerName: "David",
                                passengerAge: 35,
                                gender: 'Male',
                                bookingStatus: 'Confirmed'
                            },
                            {
                                passengerName: "Maria",
                                passengerAge: 38,
                                gender: 'Female',
                                bookingStatus: 'Confirmed'
                            }
                        ]

                    },
                    {
                        emailId: "John94@gmail.com",
                        bookingId: 2002,
                        bookingCost: 4485,
                        departureDate: new Date(year, month - 3, day - 15),
                        travelBookingClass: "Ecomomy",
                        noOfTickets: 1,
                        ticketStatus: 'Confirmed',
                        passengerDetails: [
                            {
                                passengerName: "Emily",
                                passengerAge: 29,
                                gender: 'Female',
                                bookingStatus: 'Confirmed'
                            }
                        ]
                    }
                ]
            },
            {
                flightId: "E6-2135",
                flightStatus: "Running",
                airlinesName: "Indigo",
                departureTime: new Date("01-01-01 06:00").toLocaleTimeString(),
                arrivalTime: new Date("01-01-01 08:50").toLocaleTimeString(),
                seatsAvailable: 4,
                fare: [{ travelClass: "Economy", baseFare: 3988 }, { travelClass: 'Business', baseFare: 9999 }],
                stops: 0,
                bookings: [
                    {
                        emailId: "John94@gmail.com",
                        bookingId: 2003,
                        bookingCost: 3988,
                        travelBookingClass: "Economy",
                        departureDate: new Date(year, month - 1, day - 23),
                        noOfTickets: 1,
                        ticketStatus: "Confirmed",
                        passengerDetails: [
                            {
                                passengerName: "Steve",
                                passengerAge: 25,
                                gender: 'Male',
                                bookingStatus: 'Confirmed'
                            }
                        ]

                    },
                    {
                        emailId: "John94@gmail.com",
                        bookingId: 2004,
                        bookingCost: 3988,
                        departureDate: new Date(year, month - 2, day - 19),
                        travelBookingClass: "Economy",
                        noOfTickets: 0,
                        ticketStatus: 'Cancelled',
                        passengerDetails: [
                            {
                                passengerName: "Richard",
                                passengerAge: 29,
                                gender: 'Male',
                                bookingStatus: 'Cancelled'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        source: "Chennai",
        destination: "Kolkata",
        flights: [
            {
                flightId: "AI-766",
                flightStatus: "Running",
                airlinesName: "Air India",
                departureTime: new Date("01-01-01 11:35").toLocaleTimeString(),
                arrivalTime: new Date("01-01-01 13:55").toLocaleTimeString(),
                seatsAvailable: 23,
                fare: [{ travelClass: "Economy", baseFare: 3587 }, { travelClass: 'Business', baseFare: 9649 }],
                stops: 0,
                bookings: [
                    {
                        emailId: "maria10@gmail.com",
                        bookingId: 2005,
                        bookingCost: 7174,
                        travelBookingClass: "Economy",
                        departureDate: new Date(year, month - 2, day + 8),
                        noOfTickets: 1,
                        ticketStatus: "Confirmed",
                        passengerDetails: [
                            {
                                passengerName: "Joe",
                                passengerAge: 25,
                                gender: 'Male',
                                bookingStatus: 'Confirmed'
                            },
                            {
                                passengerName: "Jack",
                                passengerAge: 35,
                                gender: 'Male',
                                bookingStatus: 'Cancelled'
                            }
                        ]
                    },
                    {
                        emailId: "John94@gmail.com",
                        bookingId: 2006,
                        bookingCost: 4485,
                        noOfTickets: 1,
                        departureDate: new Date(year, month, day - 12),
                        travelBookingClass: "Ecomomy",
                        ticketStatus: 'Confirmed',
                        passengerDetails: [
                            {
                                passengerName: "Emily",
                                passengerAge: 29,
                                gender: 'Female',
                                bookingStatus: 'Confirmed'
                            }
                        ]
                    }
                ]
            },
            {
                flightId: "E6-2145",
                flightStatus: "Cancelled",
                airlinesName: "Indigo",
                departureTime: new Date("01-01-01 06:00").toLocaleTimeString(),
                arrivalTime: new Date("01-01-01 08:50").toLocaleTimeString(),
                seatsAvailable: 10,
                fare: [{ travelClass: "Economy", baseFare: 3988 }, { travelClass: 'Business', baseFare: 9999 }],
                stops: 0,
                bookings: []
            }
        ]
    }
]


exports.setupdb = () => {
    return connection.getFlightCollection().then(flightModel => {
        return flightModel.deleteMany({}).then(data => {
            return flightModel.insertMany(flightData).then(insertedData => {
                if (insertedData.length > 0) {
                    return connection.getUserCollection().then(userModel => {
                        return userModel.deleteMany({}).then(data => {
                            return userModel.insertMany(userData).then(users => {
                                if (users.length > 0) {
                                    return { "message": "Insertion Successfull" }
                                } else throw new Error("DataBase setup Failed")
                            })
                        })
                    })
                } else throw new Error("DataBase setup Failed");
            })
        })
    })
}

// exports.setupdb().then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err.message);
// });
