const db = require("../db/models/index");
const { Artist,Track,User_Like,User_Follow,User } = db

const create = async (artistPayload) => {
    try {
        const newArtist = await Artist.create(artistPayload);
        return newArtist
    } catch (error) {
        throw error
    }
}

const findAll = async () => {
    try {
        const artists = await Artist.scope('withTracks').findAll({
            attributes:{
                include:[
      [ db.sequelize.literal("(SELECT count(id) from User_Follows where `User_Follows`.`artistId` = `Artist`.`id` group by artistId)"),"followCount"]
                ]
            },
        });
        return artists
    } catch (error) {
        throw error
    }
}

const findByPk = async (id) => {
    try {
        const artist = await Artist.scope('withTracks').findOne({
            where:{
                id:id
            },
            attributes:{
                include:[
                [ db.sequelize.literal(`(SELECT count(id) from User_Follows where artistId=${id} group by artistId)`),"followCount"]
                ]
            },
        });
        return artist
    } catch (error) {
        throw error
    }
}


const update = async (id,artistPayload)=>{
    try {
        const result = await Artist.update(artistPayload,{
            where:{
                id:id
            }
        });
        return result
    } catch (error) {
        throw error
    }
}

const destroy = async (id)=>{
    try {
        const result = await Artist.destroy({
            where:{
                id:id
            }
        });
        return result
    } catch (error) {
        throw error
    }
}

const addIntoUserFollow = async(payload)=>{
    try {
        const result = await User_Follow.create(payload);
        return result
    } catch (error) {
        throw error
    }
}

const removeFromUserFollow = async(payload)=>{
    try {
        const result = await User_Follow.destroy({
            where:{
                userId:payload.userId,
                artistId:payload.artistId
            }
        });
        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    create,findAll,findByPk,update,destroy,addIntoUserFollow,removeFromUserFollow
}