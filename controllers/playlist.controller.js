const { generalResponse } = require('../helpers/responce.helper')
const {create,update,destroy,addTrack,removeTrack,findAllPlaylist,playlistWithTrack} = require("../repositories/playlist.repositories")

const createPlaylist = async(req,res)=>{
    try {
        const {userId,name,description} = req.body
        const newPlaylist = await create({
            userId,
            name:name.trim(),
            description:description.trim()
        });
        return generalResponse(res, newPlaylist, "Album  created successfully", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, error.errors || "Something Went Wrong...", "error", true,500)
    }
}

const updatePlaylist = async(req,res)=>{
    try {
        const {  name, description } = req.body
        const result = await update(+req.params.id,{
            name:name.trim(),
            description:description.trim()
        });
            return generalResponse(res, result, result[0] ? "Playlist Updated" : "Playlist Not Updated", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, error.errors || "Something Went Wrong...", "error", true,500)

    }
}

const deletePlaylist = async(req,res)=>{
    try {
        const result = await destroy(+req.params.id)
             return generalResponse(res, result, result ? "Playlist deleted" : "Playlist Not deleted", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong...", "error", true,500)

    }
}

const addPlaylistTrack = async(req,res)=>{
    try {
        const {playlistId,trackId}= req.body
        const result = await addTrack({playlistId,trackId});
        return generalResponse(res, result, "Track addded", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong...", "error", true,500)
    }
}

const removePlaylistTrack = async(req,res)=>{
    try {
        const { playlistId, trackId } = req.body
        const result = await removeTrack({ playlistId, trackId });
            return generalResponse(res, result, result ? "Track Removed from playist" : "Track not Removed from playist", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong...", "error", true,500)
    }
}

const findUsersAllPlaylist = async(req,res)=>{
    try {
        const {userId} = req.body
        const result = await findAllPlaylist(userId)
        return generalResponse(res, result, "Playlist retrived", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong...", "error", true,500)
    }
}

const userPlaylistWithTrack = async(req,res)=>{
    try {
        const result = await playlistWithTrack(+req.params.id)
        return generalResponse(res, result, "Playlist retrived", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong...", "error", true,500)
    }
}

module.exports = {
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    addPlaylistTrack,
    removePlaylistTrack,
    findUsersAllPlaylist,
    userPlaylistWithTrack
}