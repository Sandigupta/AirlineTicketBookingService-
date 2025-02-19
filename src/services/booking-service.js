const  BookingRepository =require('../repository/booking-repository')
const axios = require('axios');
const { FLIGHT_SERVICE_PATH} = require('../config/serverConfig');
const { ServiceError } = require('../utils/errors/index');

class BookingService{
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
            const flightId = await data.flightId;
            
            let getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
        
            // let getFlightRequestURL = `http://localhost:3000/api/v1/flights/3`

            const responce = await axios.get(getFlightRequestURL);
            // console.log("FLIGHT DETAILS AFTER AXIOS FETCH",responce.data.data);
            // return responce.data;
            const flightData = responce.data.data;
            let priceOfTheFlight = flightData.price;
            // console.log(data.noOfSeats);
            if (data.noOfSeats > flightData.totalSeats) {
                throw new ServiceError('Something went wrong in the booking process','Insufficient seats in the flight',400)
            }
            
            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayload = { ...data, totalCost };
            const booking = await this.bookingRepository.createBooking(bookingPayload);

            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            await axios.patch(updateFlightRequestURL, { totalSeats: flightData.totalSeats - booking.noOfSeats });
            const finalBooking=await this.bookingRepository.update(booking.id, { status: "Booked" });
            return finalBooking;
    
        }
        catch (error) {
            // console.log(error);
            if (error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error;
            }
            throw new ServiceError();
            // Remove the unreachable code
        }
    }
}
module.exports = BookingService;

/**
 
  data: {
    data: {
      id: 3,
      flightNumber: 'UK 720',
      airplaneId: 4,
      departureAirportId: 1,
      arrivalAirportId: 4,
      arrivalTime: '2025-01-11T01:24:36.000Z',
      departureTime: '2025-01-11T00:24:36.000Z',
      price: 4500,
      boardingGate: null,
      totalSeats: 150,
      createdAt: '2025-01-11T13:58:03.000Z',
      updatedAt: '2025-01-11T13:58:03.000Z'
    },
    success: true,
    err: {},
    message: 'Successfully fetched the flights'
  }
}
 
 
 FLIGHT DETAILS AFTER AXIOS FETCH {
  id: 3,
  flightNumber: 'UK 720',
  airplaneId: 4,
  departureAirportId: 1,
  arrivalAirportId: 4,
  arrivalTime: '2025-01-11T01:24:36.000Z',
  departureTime: '2025-01-11T00:24:36.000Z',
  price: 4500,
  boardingGate: null,
  totalSeats: 150,
  createdAt: '2025-01-11T13:58:03.000Z',
  updatedAt: '2025-01-11T13:58:03.000Z'
}

FROM BOOKING CONTROLLERS {
  data: {
    id: 3,
    flightNumber: 'UK 720',
    airplaneId: 4,
    departureAirportId: 1,
    arrivalAirportId: 4,
    arrivalTime: '2025-01-11T01:24:36.000Z',
    departureTime: '2025-01-11T00:24:36.000Z',
    price: 4500,
    boardingGate: null,
    totalSeats: 150,
    createdAt: '2025-01-11T13:58:03.000Z',
    updatedAt: '2025-01-11T13:58:03.000Z'
  },
  success: true,
  err: {},
  message: 'Successfully fetched the flights'
}

 
 */