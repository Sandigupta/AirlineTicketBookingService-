const { StatusCodes } = require('http-status-codes');
const  {bookingService}  = require('../services/index');


const BookingService = new bookingService();

const create = async (req, res) => {
        try {
            const responce = await BookingService.createBooking(req.body);
            // console.log("FROM BOOKING CONTROLLERS",responce);
            return res.status(StatusCodes.OK).json({
                message: "Succefully completed booking ",
                succes: true,
                err: {},
                data:responce
                
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


module.exports = {
    create,
}