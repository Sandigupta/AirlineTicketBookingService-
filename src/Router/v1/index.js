const express = require('express');
const app = express();

const routes = express.Router();
const {BookingController }=require('../../controller/index')

// Below will be all the routes 
routes.post('/bookings', BookingController.create);

module.exports = routes;