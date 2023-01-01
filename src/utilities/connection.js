const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const userBookingsSchema = mongoose.Schema({
    bookingId: { type: Number, required: true, unique: true },
    status: {
        type: String,
        enum: {
            values: ['Confirmed', 'Modified', 'Cancelled'],
            message: "Booking Status can be either of Confirmed, Modified or Cancelled"
        }
    }
})

const userSchema = mongoose.Schema({
    emailId: {
        type: String,
        // match: [/^[A-z][A-z0-9_@$]+@(gmail|yahoo).com$/, 'emailId didnt match the required format'] 
    },
    password: { type: String, match: [/^[A-z0-9_@$]{8,15}$/, 'password didnt match the required format'] },
    userName: { type: String, match: [/^[A-z][A-z ]+$/, 'username should have only alphabets and spaces'] },
    walletAmount: { type: Number, min: [0, 'walletAmount cannot be less than 0'] },
    userType: {
        type: String, enum: {
            values: ['Platinum', 'Gold', 'Silver'],
            message: 'Invalid user type'
        },
    },
    bookings: { type: [userBookingsSchema] }
}, { collection: 'Users', timestamps: true });


let passengersSchema = mongoose.Schema({
    passengerName: { type: String, required: true },
    passengerAge: { type: Number, required: true },
    gender: {
        type: String,
        required: true,
        enum: {
            values: ['Male', 'Female'],
            message: "Gender Could be either of Male or Female"
        }
    },
    bookingStatus: {
        type: String,
        required: true,
        enum: {
            values: ['Cancelled', 'Confirmed'],
            message: 'Booking Status can be either Confirmed or Cancelled'
        }
    }

})

let bookingsSchema = mongoose.Schema({
    emailId: { type: String, required: true },
    bookingId: { type: Number, required: true, unique: true },
    bookingCost: { type: Number, required: true },
    departureDate: { type: Date, required: true },
    travelBookingClass: { type: String, required: true },
    noOfTickets: { type: Number, required: true },
    passengerDetails: { type: [passengersSchema] },
    ticketStatus: {
        type: String,
        required: true,
        enum: {
            values: ['Cancelled', 'Confirmed'],
            message: 'Booking Status can be either Confirmed or Cancelled'
        }
    }
})


let flightDetailsSchema = mongoose.Schema({
    flightId: { type: String, unique: true, required: true },
    airlinesName: { type: String, required: true },
    flightStatus: { type: String, required: true, enum: { values: ['Running', 'Cancelled'], message: "Flight Status can be either Running or Cancelled" } },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    seatsAvailable: { type: Number, required: true, min: 0 },
    fare: {
        type: [{
            travelClass: { type: String, required: true },
            baseFare: { type: Number, required: true }
        }], required: true
    },
    stops: {
        type: Number,
        required: true,
        enum: {
            values: [0, 1, 2, 3],
            message: "A flight cannot have more than 3 intermediate Stops"
        }
    },
    bookings: { type: [bookingsSchema], required: true }
})


let flightSchema = mongoose.Schema({
    source: { type: "String", uppercase: true },
    destination: { type: "String", uppercase: true },
    flights: { type: [flightDetailsSchema], required: true }
}, { collection: 'Flight', timestamps: true })


modelObj = {}


modelObj.getFlightCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/InfyAirlinesDB", { useNewUrlParser: true, useUnifiedTopology:true }).then(database => {
        return mongoose.model('Flight', flightSchema)
    }).catch(error => {
        let err = new Error("Could Not Connect to Flight Database");
        err.status = 500;
        throw err;
    })
}

modelObj.getUserCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/InfyAirlinesDB", { useNewUrlParser: true, useUnifiedTopology:true }).then(database => {
        return mongoose.model('Users', userSchema)
    }).catch(error => {
        let err = new Error("Could Not Connect to User Database");
        err.status = 500;
        throw err;
    })
}

module.exports = modelObj;

// mongodb://fp-ui:VJtKikEUJMx11JZMwava0J0NlqLNQyYnJpTPBcgDGWDEaZm1FQXmCMHvAQ1yhNiTERW3qqiq3mcWW4qpaoTXwA==@fp-ui.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@fp-ui@