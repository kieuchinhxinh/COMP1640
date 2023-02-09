const {User, validate} = require('../models/user')
const jwt = require('jsonwebtoken')
const apiResponse = require('../helpers/apiResponses_helper')
const Joi = require('joi')
const { use } = require('../routes/users')
require("dotenv").config();
let refreshTokens = [];
const schemaLoginUser = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
})

exports.registerUser = async(req,res) =>{
try {
    const result = validate(req.body);
    if(result.error) {
        return apiResponse.response_status(res,result.error.message,400);
    }
    var user = await  User.findOne({email: req.body.email});
    if (user) {
        return apiResponse.response_status(res,'Email is already exsits',400);
    } else {
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password:req.body.password,
            role: req.body.role
        });
        await user.save();
        return apiResponse.response_data(res,"Successful!",200,user);
    }
} catch (error) {
    return apiResponse.response_error_500(res,error.message);
}
}
exports.loginUser = async (req,res)=>{
   
    try {
        const email = req.body.email;
        const password = req.body.password;
        const result = schemaLoginUser.validate(req.body);
        if(result.error) {
            return apiResponse.response_status(res,result.error.message,400);
        }
        var user = await User.findOne({email:email})
        
        if(user && password === user.password) {
         const accessToken = jwt.sign({
                id: user._id,
                role: user.role,
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "60m"});
            const refreshToken = jwt.sign({
                id: user._id,
                role: user.role,
            },
            process.env.JWT_REFRESH_KEY,
            {expiresIn: "60m"});
            refreshTokens.push(refreshToken);
            res.cookie("refreshToken",refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            })
            return apiResponse.response_token(res,"Successful!",accessToken,refreshToken)
        }else {
            return apiResponse.response_status(res,'Login Fail',400);
        }

    } catch (error) {
        return apiResponse.response_error_500(res,error.message);
    }
}
exports.refreshToken = async (req,res) => {
    const refreshToken = req.cookie.refreshToken;
    if(!refreshToken) return apiResponse.response_status(res,"You are not authenticated", 401);
    if(!refreshTokens.includes(refreshToken)) return apiResponse.response_status(res,"refresh token is not valid", 403);
    jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY,(err,user)=>{
        if(err) {
           return apiResponse.response_status(res,"Token is not valid",403)
        } else {
            refreshTokens = refreshTokens.filter((token)=> token !== refreshToken);
            const newAccessToken = jwt.sign({
                id: user._id,
                role: user.role,
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "60m"});
            const newRefreshToken = jwt.sign({
                id: user._id,
                role: user.role,
            },
            process.env.JWT_REFRESH_KEY,
            {expiresIn: "60m"});

            refreshTokens.push(refreshToken);
            res.cookie("refreshToken",newRefreshToken,{
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            })
            return apiResponse.response_token(res,"Successful!",newAccessToken)
        }
    })
}

exports.logout = async (req,res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie("refreshToken");
    return apiResponse.response_status(res,"Logged out successfully!",200)
}