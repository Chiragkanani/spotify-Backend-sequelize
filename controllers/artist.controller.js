const { generalResponse } = require('../helpers/responce.helper')
const {create,findByPk,findAll,update,destroy,addIntoUserFollow,removeFromUserFollow} = require("../repositories/artist.repositories")

const createArtist  = async (req,res)=>{
    try {
        const { firstName, lastName,bio } = req.body
        const newArtist = await create({ firstName: firstName?.trim(), lastName: lastName?.trim(), bio:bio?.trim() })
        return generalResponse(res, newArtist, "Artist  Added successfully", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, error.errors || "Something Went Wrong...", "error", true)
    }
}

const findAllArtists = async (req, res) => {
    try {
        const artists = await findAll();
        return generalResponse(res, artists, "Artists Retrived", "success", true)
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true)
    }
}

const findArtistById = async (req, res) => {
    try {
        if (+req.params.id) {
            const artist = await findByPk(+req.params.id);
            return generalResponse(res, artist, "one Artist Retrived", "success", true)
        } else {
            return generalResponse(res, { success: false }, "Artist Not Exists...", "error", true)
        }
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true)
    }
}

const updateArtist = async (req,res)=>{
    try {
        const { firstName, lastName, bio } = req.body
        if (+req.params.id) {
            const result = await update(+req.params.id, { firstName: firstName?.trim(), lastName: lastName?.trim(), bio: bio?.trim() })
            if (result[0]) {
                return generalResponse(res, result, "Artist Updated", "success", true)
            }
            return generalResponse(res, result, "Artist Not Updated", "success", true)
        } else {
            return generalResponse(res, { success: false }, "Artist Not Exists...", "error", true)
        }
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, error.errors || "Something Went Wrong...", "error", true)
    }
}

const deleteArtist = async (req,res)=>{
    try {
        if (+req.params.id) {
            const result = await destroy(+req.params.id);
            if (result) {
                return generalResponse(res, result, "Artist deleted", "success", true)
            }
            return generalResponse(res, result, "Artist not deleted", "success", true)
        } else {
            return generalResponse(res, { success: false }, "Artist Not Exists...", "error", true)
        }
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true)
    }
}

const addArtistIntoUserFollow = async (req,res)=>{
    try {
            const {userId,artistId} = req.body
            const result = await addIntoUserFollow({userId,artistId});
            return generalResponse(res, result, "Artist followed", "success", true);
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true)
    }
}

const removeArtistFromUserFollow = async (req,res)=>{
    try {
            const {userId,artistId} = req.body
            const result = await removeFromUserFollow({userId,artistId});
            return generalResponse(res, result, "Artist unfollowed", "success", true);
    } catch (error) {
        console.log(error);
        return generalResponse(res, { success: false }, "Something Went Wrong... try again later..", "error", true)
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