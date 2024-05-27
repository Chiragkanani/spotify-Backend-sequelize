const db = require("../db/models/index");
const { Op} = require("sequelize");

const { Album,albumHasManyArtist,albumHasManyTrack,Album_Artist,Album_Track } = db


const create = async (albumPayload) => {
    try {
        let newAlbum
        const result = await db.sequelize.transaction(async t => {
            newAlbum = await Album.create(albumPayload,{
                include:[albumHasManyArtist,albumHasManyTrack],
                transaction:t
            });
        });
        return newAlbum
    } catch (error) {
        throw error
    }
}

const findAll = async () => {
    try {
        const albums = await Album.scope('withTracks').findAll();
        return albums
    } catch (error) {
        throw error
    }
}

const findOneWithTracks = async (id) => {
    try {
        const album = await Album.scope('withTracks').findOne({
            where:{
                id:id
            }
        });
        return album
    } catch (error) {
        throw error
    }
}

const findOne = async (id)=>{
    try {
        const album = await Album.findAll({
            where: {
                id: id
            }
        });
        return album
    } catch (error) {
        throw error
    }
}
const update = async (id, albumPayload) => {
    try {
        let artists = albumPayload.artists;
        let tracks = albumPayload.tracks;
        let updated;
        const result = await db.sequelize.transaction(async t => {
            const deleteArtist = await Album_Artist.destroy({
                where: {
                    albumId: id,
                    artistId: {
                        [Op.notIn]: artists
                    }
                },
                transaction: t
            })

            for (const item of artists) {
                const [albumUpsert, created] = await Album_Artist.findOrCreate({
                    where: {
                        albumId: id,
                        artistId: item,
                    },
                    transaction: t
                });
            }
            const deleteTracks = await Album_Track.destroy({
                where: {
                    albumId: id,
                    trackId: {
                        [Op.notIn]: tracks
                    }
                },
                transaction: t
            })

            for (const item of tracks) {
                const [albumUpsert, created] = await Album_Track.findOrCreate({
                    where: {
                        albumId: id,
                        trackId: item,
                    },
                    transaction: t
                });
            }
            updated = await Album.update(albumPayload, {
                transaction: t,
                where: {
                    id: id
                }
            });
        });
        return updated
    } catch (error) {
        throw error
    }
}

const destroy = async (id) => {
    try {
        const result = await Album.destroy({
            where: {
                id: id
            }
        });
        return result
    } catch (error) {
        throw error
    }
}
module.exports = {
    create, 
    findAll, 
    findOne, 
    update, 
    destroy,
    findOneWithTracks
}