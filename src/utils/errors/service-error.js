const { StatusCode }  = require('http-status-codes');

// this is called user querated error.
class ServiceError extends Error{
    constructor(
        message = 'Something went wrong',
        explanation='Service layer error',
        statusCode=StatusCode.INTERNAL_SERVER_ERROR
    ) {
        super()
        this.name = 'ServiceError';
        this.message = message;
        this.explanation = explanation;
        this.statusCode = statusCode;
      }  
}