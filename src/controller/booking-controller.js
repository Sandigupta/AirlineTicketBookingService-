const { StatusCodes } = require('http-status-codes');
const  {bookingService}  = require('../services/index');

// const { createChannel, publishMessage } = require('../utils/messageQueue');

// const { REMINDER_BINDING_KEY } = require('../config/serverConfig');


const BookingService = new bookingService();


class BookingController{
    constructor() {
    } 
    
    // async sendMessageToQueue(req, res) {
    //     const channel = await createChannel();
    //     // const data = {
    //     //     message: 'Success',
    //     //     serviceType:'DEMO_SERVICE'
    //     //  };
    //     const payload = {
    //         data: {
    //             Subject: 'This is a notification from queue',
    //             Content: 'Some queue will subscribe this',
    //             recepientEmail: 'cs191297@gmail.com',
    //             notificationTime:'2023-01-08 10:49:00'
    //         },
    //         service:'CREATE_TICKET'
    //     }
        
    //     publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
    //     return res.status(200).json({
    //         message: 'Succesfully published the event'
    //     });
    // }
    
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
            //     // err: error.explanation,
            //     data:{}
            // })
        }
        
    }
    
   
}

module.exports = BookingController
