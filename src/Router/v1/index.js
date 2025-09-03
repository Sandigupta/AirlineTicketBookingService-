const express = require('express');
const app = express();

const routes = express.Router();
const { BookingController } = require('../../controller/index');
// const { createChannel } = require('../../utils/messageQueue');

// const channel = await createChannel();
const bookingController = new BookingController();

// Below will be all the routes 
routes.post('/bookings', bookingController.create);



routes.get('/info', (req, res) => {
    return res.status(200).json({
        Message:"Responce from router"
    })
})

module.exports = routes;



























// routes.post('/publish', bookingController.sendMessageToQueue)//for publish the data in queue
