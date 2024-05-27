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
        return generalResponse(res, { success: false }, error.errors || "Something Went Wrong...", "error", true)
    }
}

const updatePlaylist = async(req,res)=>{
    try {
        const {  name, description } = req.body
        const result = await update(+req.params.id,{
            name:name.trim(),
            description:description.trim()
        });
        if (result[0]) {
            return generalResponse(res, result, "Playlist Updated", "success", true)
        }
        return generalResponse(res, result, "Playlist Not Updated", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, error.errors || "Something Went Wrong...", "error", true)

    }
}

const deletePlaylist = async(req,res)=>{
    try {
        const result = await destroy(+req.params.id)
         if (result) {
            return generalResponse(res, result, "Playlist deleted", "success", true)
        }
        return generalResponse(res, result, "Playlist Not deleted", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong...", "error", true)

    }
}

const addPlaylistTrack = async(req,res)=>{
    try {
        const {playlistId,trackId}= req.body
        const result = await addTrack({playlistId,trackId});
        return generalResponse(res, result, "Track addded", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong...", "error", true)
    }
}

const removePlaylistTrack = async(req,res)=>{
    try {
        const { playlistId, trackId } = req.body
        const result = await removeTrack({ playlistId, trackId });
        if (result) {
            return generalResponse(res, result, "Track Removed from playist", "success", true)
        }
        return generalResponse(res, result, "Track not Removed from playist", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong...", "error", true)
    }
}

const findUsersAllPlaylist = async(req,res)=>{
    try {
        const {userId} = req.body
        const result = await findAllPlaylist(userId)
        return generalResponse(res, result, "Playlist retrived", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong...", "error", true)
    }
}

const userPlaylistWithTrack = async(req,res)=>{
    try {
        const result = await playlistWithTrack(+req.params.id)
        return generalResponse(res, result, "Playlist retrived", "success", true)

    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong...", "error", true)
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