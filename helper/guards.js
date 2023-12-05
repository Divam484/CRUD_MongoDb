const UserModel = require("../services/users/users.model");
const { commonResponse, commonFunctions } = require("../helper");
const jwt = require("jsonwebtoken");


exports.ensureUserAuthenticated = async (req, res, next) => {

    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        // console.log("token",req.headers.authorization)
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // console.log("decoded",decoded)
            req.user = await UserModel.findOne({_id: decoded._id})
            next()
        } catch (error) {
            return commonResponse.customErrorResponse(res, 401,"Not authorized,token failed",error);
        }
    }
    if (!token) {
        return commonResponse.customErrorResponse(res, 401,"Not authorized","no token");
    }
}

