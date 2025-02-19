const { StatusCode } =require('http-status-codes');

// this is called the error handling provided by the server
class ValidationError extends Error{
    constructor(error) {
        // console.log(error);
        super();
        // let explanation = []
        // error.errors.forEach((err) => {
        //      explanation.push(err.message)
        // });
        this.name = 'ValidationError';
        this.message = 'Not able to validate the data send in the request';
        this.explanation = `Cannot access 'booking' before initialization`;
        this.statusCode = 401; 
        
    }
}

module.exports = ValidationError;


/**
 {
  error: {
    error: ValidationError [SequelizeValidationError]: notNull Violation: Flights.totalSeats cannot be null
        at InstanceValidator._validate (D:\Sanket Singh\Search_and_Flight_Service\node_modules\sequelize\lib\instance-validator.js:50:13)
        at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
        at async InstanceValidator._validateAndRunHooks (D:\Sanket Singh\Search_and_Flight_Service\node_modules\sequelize\lib\instance-validator.js:60:7)
        at async InstanceValidator.validate (D:\Sanket Singh\Search_and_Flight_Service\node_modules\sequelize\lib\instance-validator.js:54:12)
        at async Flights.update (D:\Sanket Singh\Search_and_Flight_Service\node_modules\sequelize\lib\model.js:1933:26)
        at async FlightRepository.updateFlights (D:\Sanket Singh\Search_and_Flight_Service\src\repository\flight-repository.js:66:13)
        at async FlightService.updateFlight (D:\Sanket Singh\Search_and_Flight_Service\src\services\flight-service.js:53:28)
        at async update (D:\Sanket Singh\Search_and_Flight_Service\src\controllers\flight-controllers.js:86:24) {
      errors: [Array]
    }
  }
}

 */