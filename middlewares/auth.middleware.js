const jwt = require("jsonwebtoken");
const { generalResponse } = require('../helpers/responce.helper')

const auth = (req, res, next) => {
    try {
        if (req.cookies.token) {
            try {
                let decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
                next();
            } catch (err) {
                console.log(err);
                return generalResponse(res, { success: false }, "Please Login first...", "error", true)
            }
        } else {
            return generalResponse(res, { success: false }, "Please Login first...", "error", true)
        }
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... in auth middleware", "error", true)
    }
};

module.exports = auth;