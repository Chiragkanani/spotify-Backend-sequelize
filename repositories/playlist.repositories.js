const db = require("../db/models/index");
const { Playlist,Playlist_Track,User,Track,Artist } = db

const create = async(playlistPlayload)=>{
    try {
        const newPlaylist = await Playlist.create(playlistPlayload);
        return newPlaylist        
    } catch (error) {
        throw error
    }
}

const update = async(id,playlistPlayload)=>{
    try {
        const update = await Playlist.update(playlistPlayload,{
            where:{
                id:id
            }
        });
        return update
    } catch (error) {
        throw error
    }
}

const destroy = async(id)=>{
    try {
        const result = await Playlist.destroy({
            where:{
                id:id
            }
        });
        return result
    } catch (error) {
        throw error
    }
}


const addTrack = async(payload)=>{
    try {
        const result = await Playlist_Track.create(payload);
        return result
    } catch (error) {
        throw error
    }
}


const removeTrack = async(payload)=>{
    try {
        const result = await Playlist_Track.destroy({
            where:{
                playlistId:payload.playlistId,
                trackId:payload.trackId
            }
        });
        return result
    } catch (error) {
        throw error
    }
}

const findAllPlaylist = async(userId)=>{
    try {
        const result = await Playlist.findAll({
            where:{
                userId:userId
            },
            // include:[User]
        });
        return result
    } catch (error) {
        throw error
    }
}

const playlistWithTrack = async(id)=>{
    try {
        const result = await Playlist.findOne({
            where:{
                id:id
            },
            include:[{
                model:Track,
                through:{
                    attributes:[]
                },
                include:[{
                    model:Artist,
                    through: {
                        attributes: []
                    },
                }]
            }]
        });
        return result
    } catch (error) {
        throw error
    }
}
module.exports = {
create,update,destroy,addTrack,removeTrack,findAllPlaylist,playlistWithTrack
}