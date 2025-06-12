const jwt = require('jsonwebtoken');
const responseMessages = require('../utils/responseMessages');
const statusCodes = require('../utils/statusCodes');

module.exports = ( req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(statusCodes.UNAUTHORIZED).json({message: responseMessages.ACCESS_DENIED})

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        }catch(err){
            console.log(err)
            res.status(statusCodes.BAD_REQUEST).json({message: responseMessages.INVALID_TOKEN})
        }
}