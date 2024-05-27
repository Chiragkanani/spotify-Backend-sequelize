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
        const artists = await Artist.findAll({
            include: [{
                model: Track,
                through: {
                    attributes: []
                },
                include: [{
                    model: User_Like,
                    attributes: []
                }],
                attributes: {
                    include: [[
                        db.Sequelize.fn('COUNT', db.Sequelize.col('Tracks->User_Likes.trackId')),
                        'likesCount'
                    ]]
                },
                group: ['Track.id'],
                raw: true,
                nest: true
            }],
            group: ['Artist.id', 'Tracks.id'],
            nest: true
        });
        return artists
    } catch (error) {
        throw error
    }
}

const findByPk = async (id) => {
    try {
        const artist = await Artist.findOne({
            where:{
                id:id
            },
            
            include:[{
                model:Track,
                through:{
                    attributes:[]
                },
                include: [{
                    model: User_Like,
                    attributes: []
                }],
                attributes: {
                    include: [[
                        db.Sequelize.fn('COUNT', db.Sequelize.col('Tracks->User_Likes.trackId')),
                        'likesCount'
                    ]]
                },
                group: ['Track.id'],
                nest:true
            },
            {
                model:User_Follow,
                attributes:  [[
                        db.Sequelize.fn('COUNT', db.Sequelize.col('User_Follows.id')),
                        'followCount'
                    ]],
            }],
            group: ['Artist.id','User_Follows.id', 'Tracks.id',],
            nest: true
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