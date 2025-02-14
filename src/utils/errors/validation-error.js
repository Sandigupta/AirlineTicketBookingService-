const { StatusCode } = require('http-status-codes');

// this is called the error handling provided by the server
class ValidationError extends Error{
    constructor(error) {
        super();
        let explanation = []
        error.errors.forEach((err) => {
             explanation.push(err.message)
        });
        this.name = 'ValidationError';
        this.message = 'Not able to validate the data send in the request';
        this.explanation = explanation;
        this.statusCode = StatusCode.BAD_REQUEST; 
        
    }
}