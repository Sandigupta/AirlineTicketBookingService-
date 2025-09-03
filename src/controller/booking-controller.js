const { StatusCodes } = require('http-status-codes');
const  {bookingService}  = require('../services/index');

// const { createChannel, publishMessage } = require('../utils/messageQueue');

// const { REMINDER_BINDING_KEY } = require('../config/serverConfig');


const BookingService = new bookingService();


class BookingController{
    constructor() {
    } 
    
   
    
    async create(req, res) {
        try {
            const responce = await BookingService.createBooking(req.body);
            // console.log("FROM BOOKING CONTROLLERS",responce);
            return res.status(StatusCodes.OK).json({
                message: "Succefully completed booking ",
                succes: true,
                err: {},
                data: responce
            })
        } catch (error) {
            console.log("FROM BOOKING CONTROLLERS", error);
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                err: error.explanation,
                data:{}
            })

            // return res.status(500).json({
            //     message: error,
            //     success: false,
            
            //     data:{}
            // })
        }
        
    }
    
   
}

module.exports = BookingController
