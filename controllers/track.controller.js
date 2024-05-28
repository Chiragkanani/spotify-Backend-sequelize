const { generalResponse } = require('../helpers/responce.helper')
const { create,findAll,findOne,destroy,update,addTrackToUserLike,removeTrackToUserLike,usersLikedTracks } = require("../repositories/track.repositories")
const createTrack = async (req,res)=>{
    try {
        const {title,duration,releaseDate,artists} = req.body
        const Track_Artists = artists.reduce((auc,cur)=>{
            auc.push({artistId:cur})
            return auc
        },[]);
        const newtrack = await create({
            title:title.trim(),
            path:req.file.path,
            releaseDate,
            duration,
            Track_Artists
        });
        return generalResponse(res, newtrack, "Track  Added successfully", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, error.errors || "Something Went Wrong...", "error", true,500)
    }
}


const findAllTracks = async(req,res)=>{
    try {
        const tracks = await findAll();
        return generalResponse(res, tracks, "Track  retrived", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true,500)
    }
}

const findByPk = async(req,res)=>{
    try {
        const track = await findOne(+req.params.id);
        return generalResponse(res, track, "Track  retrived", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true, 500)
    }
}

const deleteTrack = async(req,res)=>{
    try {
        const result = await destroy(+req.params.id);
            return generalResponse(res, result, result ? "Track deleted" : "Track not deleted", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true, 500)
    }
}

const updateTrack = async(req,res)=>{
    try {
        const { title, duration, releaseDate, artists } = req.body
        const result = await update(+req.params.id,{
            title: title.trim(),
            path: path.trim(),
            releaseDate,
            duration,
            artists
        });
        return generalResponse(res, result, "Track updated", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, error.errors || "Something Went Wrong...", "error", true,500)
    }
}

const addTrackToUserLiked = async(req,res)=>{
    try {
        const {userId,trackId} = req.body
        const result = await addTrackToUserLike({userId,trackId});
        return generalResponse(res, result, "Track added to Liked", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, error.errors || "Something Went Wrong...", "error", true,500)
    }
}

const removeTrackToUserLiked = async(req,res)=>{
    try {
        const {userId,trackId} = req.body
        const result = await removeTrackToUserLike({userId,trackId});
        return generalResponse(res, result, "Track removed from Liked", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, error.errors || "Something Went Wrong...", "error", true,500)
    }
}

const usersLikedTracksCollection = async(req,res)=>{
    try {
        const result = await usersLikedTracks(+req.params.id);
        return generalResponse(res, result, "Users Liked Tracks List", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true,500)
    }
}

module.exports = {
    createTrack,
    findAllTracks,
    findByPk,
    deleteTrack,
    updateTrack,
    addTrackToUserLiked,
    removeTrackToUserLiked,
    usersLikedTracksCollection
}