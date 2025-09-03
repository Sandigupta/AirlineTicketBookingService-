const  BookingRepository =require('../repository/booking-repository')
const axios = require('axios');
const { FLIGHT_SERVICE_PATH} = require('../config/serverConfig');
const { ServiceError } = require('../utils/errors/index');

const { createChannel, publishMessage } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/serverConfig');

class BookingService{
    constructor() {
        this.bookingRepository = new BookingRepository();
  }
    
  async sendMessageToQueue(data) {
    const channel = await createChannel();
    // const data = {
    //     message: 'Success',
    //     serviceType:'DEMO_SERVICE'
    //  };
    const payload = {
        data: {
            Subject: 'This is a notification from queue',
            Content: 'Some queue will subscribe this', 
            recepientEmail: data.Email,
            notificationTime:'2023-01-08 10:49:00'
        },
        service:'CREATE_TICKET'
    }
    
    await publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
    return res.status(200).json({
        message: 'Succesfully published the event'
    });
}


    async createBooking(data) {
      try {
        console.log(data);
            const flightId = await data.flightId;
            
            let getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
            console.log(getFlightRequestURL)
            // let getFlightRequestURL = `http://localhost:3000/api/v1/flights/3`

            const responce = await axios.get(getFlightRequestURL);
            // console.log("FLIGHT DETAILS AFTER AXIOS FETCH",responce.data.data);
        // return responce.data;
        console.log(responce.data);
            const flightData = responce.data.data;
            let priceOfTheFlight = flightData.price;
          // console.log(data.noOfSeats);
        const email = data.Email;
            // console.log(priceOfTheFlight);
            if (data.noOfSeats > flightData.totalSeats) {
                throw new ServiceError('Something went wrong in the booking process','Insufficient seats in the flight',400)
            }
            
            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayload = { ...data, totalCost };
            const booking = await this.bookingRepository.createBooking(bookingPayload);
             
          
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            await axios.patch(updateFlightRequestURL, { totalSeats: flightData.totalSeats - booking.noOfSeats });
            const finalBooking=await this.bookingRepository.update(booking.id, { status: "Booked" });
            await sendMessageToQueue(data);

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
 
 
 FLIGHT DETAILS AFTER AXIOS FETCH (data.date){
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

FROM BOOKING CONTROLLERS (.data){
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