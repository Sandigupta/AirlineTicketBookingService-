const { StatusCodes } = require('http-status-codes');
const { Booking } = require('../models/index');
const {Validation, AppError, ValidationError}=require('../utils/errors/index');
const booking = require('../models/booking');

class BookingRepository{
      
    constructor() {
        this.booking = new Booking();
    }
    
    async createBooking(data) {
        try {
            const booking = await booking.create(data);
            return booking;
        } catch (error) {
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

    async update() {
        
    }
}

module.exports = BookingRepository;