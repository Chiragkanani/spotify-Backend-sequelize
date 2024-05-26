const { Op, where } = require("sequelize");
const db = require("../db/models/index");
const { Track,trackHasManyArtist,Artist,Track_Artist,User_Like,User } = db

const create = async (trackPayload)=>{
    try {
        let newTrack;
        const result = await db.sequelize.transaction(async t => {
         newTrack = await Track.create(trackPayload,{
            include:[trackHasManyArtist],
            transaction:t
        });
    });
    return newTrack
    } catch (error) {
        throw error
    }
}

const findAll = async()=>{
    const tracks = await Track.findAll({
        attributes: {
            include: [[
                db.Sequelize.fn('COUNT', db.Sequelize.col('User_Likes.trackId')),
                'likesCount'
            ]]
        },
        include: [{
            model: Artist,
            attributes: ['id', 'firstName', 'lastName'],
            through: {
                attributes: []
            }
        }, {
            model: User_Like,
            attributes: []
        }],
        group: ['Track.id', 'Artists.id'],
        nest: true
    });
    return tracks
}

const findOne = async(id)=>{
    try {
        const track = await Track.scope('withLikeCount').findOne({
            where: {
                id: id
            },
            include: [{
                model: Artist,
                attributes: ['id', 'firstName','lastName'],
                through: {
                    attributes: []
                }
            },{
                model:User_Like,
                attributes: []
            }],
            group: ['Track.id', 'Artists.id'],
            raw: true,
            nest:true
        });
        return track
    } catch (error) {
        throw error
    }   
}


const update = async (id,trackPayload)=>{
    try {
       let artists = trackPayload.artists;
       let updated;
        const result = await db.sequelize.transaction(async t => {
            const deleteArtist = await Track_Artist.destroy({
                where:{
                    trackId:id,
                    artistId:{
                        [Op.notIn]: artists
                    }
                },
                transaction:t
            })

            for (const item of artists) {
                const [trackUpsert, created] = await Track_Artist.findOrCreate({
                    where:{
                    trackId: id,
                    artistId: item,
                    },
                    transaction: t
                });
            }
             updated = await Track.update(trackPayload, {
                include: [trackHasManyArtist],
                transaction: t,
                where:{
                    id:id
                }
            });
        });
        return updated
    } catch (error) {
        throw error
    }
}

const destroy = async(id)=>{
    try {
        const result  = await Track.destroy({
            where:{
                id:id
            }
        });
        return result
    } catch (error) {
        throw error
    }
}


const addTrackToUserLike = async(payload)=>{
    try {
        const result = await User_Like.create(payload);
        return result
    } catch (error) {
        throw error
    }
}

const removeTrackToUserLike = async(payload)=>{
    try {
        const result = await User_Like.destroy({
            where:{
                userId:payload.userId,
                trackId:payload.trackId
            }
        });
        return result
    } catch (error) {
        throw error
    }
}

const usersLikedTracks = async(id)=>{
    try {
        const result = await User.findOne({
            where:{
                id:id
            },
            include:[{
                model:Track,
                through:{
                    attributes:[]
                },
                include:{
                    model:Artist,
                    through:{
                        attributes:[]
                    }
                }
            }]
        });
        return result
    } catch (error) {
        console.log(error);
        throw error
    }
}
module.exports = {
    create,findAll,findOne,destroy,update,addTrackToUserLike,removeTrackToUserLike,usersLikedTracks
}