const db = require("../db/models/index");
const { User } = db


const create = async (userPayload) => {
    try {
        const newUser = await User.create(userPayload);
        return newUser
    } catch (error) {
        throw error
    }
}

const findAll = async ()=>{
    try {
        const users = await User.findAll();
        return users
    } catch (error) {
        throw error
    }
}

const findByPk = async (id)=>{
    try {
        const user = await User.findByPk(id);
        return user
    } catch (error) {
        throw error
    }
}

const findUserByEmail = async (email)=>{
    try {
        const user = await User.findOne({
            where:{
                email:email
            }
        });
        return user
    } catch (error) {
        throw error
    }
}

const update = async(id,userPayload)=>{
    try {
        const user = await User.update(userPayload,{
            where:{
                id:id
            }
        });
        return user
    } catch (error) {
        throw error
    }
}



module.exports = { 
    create,
    findAll,
    findByPk,
    findUserByEmail,
    update 
}