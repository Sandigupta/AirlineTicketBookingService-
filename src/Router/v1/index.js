const express = require('express');
const app = express();

const routes = express.Router();
const { BookingController } = require('../../controller/index');
const { createChannel } = require('../../utils/messageQueue');

// const channel = await createChannel();
const bookingController = new BookingController();

// Below will be all the routes 
routes.post('/bookings', bookingController.create);
routes.post('/publish',bookingController.sendMessageToQueue)

module.exports = routes;