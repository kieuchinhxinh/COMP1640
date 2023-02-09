const jwt = require('jsonwebtoken')
const apiResponse = require('../helpers/apiResponses_helper')

exports.verifyToken = (req,res,next) => {
    const token = req.header.token;
    if(token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken,process.env.JWT_ACCESS_KEY,(err,user)=> {
            if(err) {
                return apiResponse.response_status(res,"Token is not valid",403)
            } 
            next();
        })
    } else {
        return apiResponse.response_status(res,"You are not authenticated", 401);
    }
}