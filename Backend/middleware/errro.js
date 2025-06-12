const responseMessages = require("../utils/responseMessages");
const statusCodes = require("../utils/statusCodes");

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    res.status(err.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message || responseMessages.INTERNAL_SERVER_ERROR
    })
}

module.exports = errorHandler;