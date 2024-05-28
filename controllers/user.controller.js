const { generalResponse } = require('../helpers/responce.helper')
const { create,findAll,findByPk,update,findUserByEmail } = require("../repositories/user.repositories")



const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        const user = await findUserByEmail(email);
        if (user) {
            return generalResponse(res, { success: false }, "Email already exists", "error", true, 200)
        }
        const newUser = await create({ firstName: firstName?.trim(), lastName: lastName?.trim(), email, password: password?.trim() })
        return generalResponse(res, newUser, "User created successfully", "success", true,201)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, error.errors || "Something Went Wrong...", "error", true,500)
    }
}


const findAllUsers = async(req,res)=>{
    try {
        const users = await findAll();
        return generalResponse(res, users, "Users Retrived", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true)
    }
}

const findUserById = async (req,res)=>{
    try {
        if (+req.params.id) {
            const user = await findByPk(+req.params.id);
            return generalResponse(res, user, "User Retrived", "success", true)
        }else{
            return generalResponse(res, { success: false }, "User Not Exists...", "error", true)   
        }
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true)   
    }
}

const userUpdate = async(req,res)=>{
    try {
        const { firstName, lastName } = req.body
        if (+req.params.id) {
            const result = await update(+req.params.id,{firstName:firstName.trim(),lastName:lastName.trim()});
            if (result[0]) {
                return generalResponse(res, result, "user Updated", "success", true)
            }
            return generalResponse(res, result, "user Not Updated", "success", true)
        } else {
            return generalResponse(res, { success: false }, "User Not Exists...", "error", true)
        }
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, error.errors || "Something Went Wrong...", "error", true)    }
}
module.exports = { 
    findAllUsers,
    createUser,
    findUserById,
    userUpdate 
}