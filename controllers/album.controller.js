const { generalResponse } = require('../helpers/responce.helper')
const { create, findOne, findAll, update, destroy,findOneWithTracks } = require("../repositories/albums.repositories")

const createAlbum = async (req,res)=>{
    try {
        const {title,genre,releaseDate,tracks,artists} = req.body
        const Album_Tracks = tracks.reduce((auc, cur) => {
            auc.push({ trackId: cur })
            return auc
        }, []);
        const Album_Artists = artists.reduce((auc, cur) => {
            auc.push({ artistId: cur })
            return auc
        }, []);
        const newalbum = await create({
            title:title.trim(),
            genre:genre.trim(),
            releaseDate,
            Album_Artists,
            Album_Tracks
        });
        return generalResponse(res, newalbum, "Album  created successfully", "success", true)

    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, error.errors || "Something Went Wrong...", "error", true)
    }
}
const findAllAlbums = async(req,res)=>{
    try {
        const albums = await findAll();
        return generalResponse(res, albums, "Albums  retrived", "success", true)

    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true)
    }
}

const findOneAlbum = async(req,res)=>{
    try {
        const album = await findOne(+req.params.id);
        return generalResponse(res, album, "Albums  retrived", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true)
    }
}

const findOneAlbumWithTrack = async(req,res)=>{
    try {
        const album = await findOneWithTracks(+req.params.id);
        return generalResponse(res, album, "Albums  retrived", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true)
    }
}

const deleteAlbum = async (req, res) => {
    try {
        if (+req.params.id) {
            const result = await destroy(+req.params.id);
            if (result) {
                return generalResponse(res, result, "Album deleted", "success", true)
            }
            return generalResponse(res, result, "Album not deleted", "success", true)
        } else {
            return generalResponse(res, { success: false }, "Album Not Exists...", "error", true)
        }
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true)
    }
}


const updateAlbum = async(req,res)=>{
    try {
        const { title, genre, releaseDate, tracks, artists } = req.body
        const result = await update(+req.params.id,{
            title: title.trim(),
            genre: genre.trim(),
            releaseDate,
            tracks,
            artists
        });
        return generalResponse(res, result, "Album updated", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, error.errors || "Something Went Wrong...", "error", true)
    }
}

module.exports = {
    createAlbum,findAllAlbums,findOneAlbum,deleteAlbum,updateAlbum,findOneAlbumWithTrack
}