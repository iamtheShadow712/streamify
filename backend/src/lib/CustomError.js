class CustomError extends Error {
    constructor(statusCode = 500, message = "Internal Server Error!!!") {
        super(message); // must be first
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;