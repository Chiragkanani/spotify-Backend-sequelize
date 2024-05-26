const router = require("express").Router();
const auth = require('../middlewares/auth.middleware');
const { createAlbum,findAllAlbums,findOneAlbum,deleteAlbum,updateAlbum,findOneAlbumWithTrack} = require('../controllers/album.controller')
router.use(auth)
router.post("/", createAlbum)
router.get("/", findAllAlbums)
router.get("/:id", findOneAlbum)
router.get("/withtracks/:id", findOneAlbumWithTrack)
router.put("/:id", updateAlbum)
router.delete("/:id", deleteAlbum)

module.exports = router


// {
//     "title": "akash",
//         "releaseDate": "2024-05-23 16:05:00",
//             "genre": "love",
//                 "tracks": [7],
//                     "artists": [1, 3]
// }