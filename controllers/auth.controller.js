const { generalResponse } = require('../helpers/responce.helper')
const { create,findUserByEmail } = require("../repositories/user.repositories")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: `.env` });

const register = async (req,res)=>{
    try {
        const { firstName,lastName,email,password} = req.body
        const user = await findUserByEmail(email);
        if (user) {
            return generalResponse(res, { success: false }, "Email already exists", "error", true,200)
        }
        const newUser =await create({firstName:firstName?.trim(),lastName:lastName?.trim(),email,password:password?.trim()})
        return generalResponse(res, newUser, "User Register successfully", "success", true,201)   
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, error.errors || "Something Went Wrong...","error",true,500)
    }
}

const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await findUserByEmail(email);
        if(!user){
            return generalResponse(res, { success: false },  "Wrong Credential....", "error", true)
        }
        if (!await bcrypt.compare(password+user.salt,user.password)) {
            return generalResponse(res, { success: false }, "Wrong Credential....", "error", true)
        }
        let token = jwt.sign(
            { id: user.id },
            process.env.SECRET_KEY
        );
        res.cookie("token",token);
        return generalResponse(res, { success: true }, `You are logged in now ${user.fullName}`, "success", true)

    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false },  "Something Went Wrong...", "error", true,500)
    }
}

module.exports = {
    register,
    login
}