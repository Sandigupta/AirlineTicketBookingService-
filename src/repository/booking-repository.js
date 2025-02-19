const { StatusCodes } = require('http-status-codes');
const { Booking } = require('../models/index');
const {AppError, ValidationError}=require('../utils/errors/index');

class BookingRepository{
      
    constructor() {
        this.booking =  Booking;
    }
    
    async createBooking(data) {
        try {
            const booking = await this.booking.create(data);
            return booking;
        } catch (error) {
            // console.log("CONTROLLER_ERROR:",error)
            if (error.name = 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            throw new AppError(
                "RepositoryError",
                "Can not create booking",
                "There was some issue creating booking, please tyr again later",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async update(bookingId,data) {
           try {
               const booking = await Booking.findByPk(bookingId);
               if (data.status) {
                   booking.status = data.status;
               }
               await booking.save();
               return booking;
           } catch (error) {
                throw new AppError(
                    "RepositoryError",
                    "Can not create booking",
                    "There was some issue creating booking, please tyr again later",
                    StatusCodes.INTERNAL_SERVER_ERROR
                ); 
           }
    }
}

module.exports = BookingRepository;