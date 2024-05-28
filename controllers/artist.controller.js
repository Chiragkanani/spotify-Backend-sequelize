const { generalResponse } = require('../helpers/responce.helper')
const {create,findByPk,findAll,update,destroy,addIntoUserFollow,removeFromUserFollow} = require("../repositories/artist.repositories")

const createArtist  = async (req,res)=>{
    try {
        const { firstName, lastName,bio } = req.body
        const newArtist = await create({ firstName: firstName?.trim(), lastName: lastName?.trim(), bio:bio?.trim() })
        return generalResponse(res, newArtist, "Artist  created successfully", "success", true,201)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, error.errors || "Something Went Wrong...", "error", true,500)
    }
}

const findAllArtists = async (req, res) => {
    try {
        const artists = await findAll();
        return generalResponse(res, artists, "Artists Retrived", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true,500)
    }
}

const findArtistById = async (req, res) => {
    try {
        if (+req.params.id) {
            const artist = await findByPk(+req.params.id);
            return generalResponse(res, artist, "one Artist Retrived", "success", true)
        } else {
            return generalResponse(res, { success: false }, "Artist Not Exists...", "error", true,400)
        }
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true,500)
    }
}

const updateArtist = async (req,res)=>{
    try {
        const { firstName, lastName, bio } = req.body
        if (+req.params.id) {
            const result = await update(+req.params.id, { firstName: firstName?.trim(), lastName: lastName?.trim(), bio: bio?.trim() })
            return generalResponse(res, result, result[0] ? "Artist Updated":"Artist not updated", "success", true)
        } else {
            return generalResponse(res, { success: false }, "Artist Not Exists...", "error", true,400)
        }
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, error.errors || "Something Went Wrong...", "error", true,500)
    }
}

const deleteArtist = async (req,res)=>{
    try {
        if (+req.params.id) {
            const result = await destroy(+req.params.id);
            return generalResponse(res, result, result? "Artist deleted":"Artist not deleted", "success", true,200)
        } else {
            return generalResponse(res, { success: false }, "Artist Not Exists...", "error", true,400)
        }
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true,500)
    }
}

const addArtistIntoUserFollow = async (req,res)=>{
    try {
        const {userId,artistId} = req.body
        const result = await addIntoUserFollow({userId,artistId});
        return generalResponse(res, result, "Artist followed", "success", true);
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true,500)
    }
}

const removeArtistFromUserFollow = async (req,res)=>{
    try {
        const {userId,artistId} = req.body
        const result = await removeFromUserFollow({userId,artistId});
        return generalResponse(res, result, "Artist unfollowed", "success", true);
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true,500)
    }
}

module.exports = {
    createArtist,
    findAllArtists,
    findArtistById,
    updateArtist,
    deleteArtist,
    addArtistIntoUserFollow,
    removeArtistFromUserFollow
}