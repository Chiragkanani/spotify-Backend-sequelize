const router = require("express").Router();
const auth = require('../middlewares/auth.middleware');
const { createAlbum,findAllAlbums,findOneAlbum,deleteAlbum,updateAlbum,findOneAlbumWithTrack} = require('../controllers/album.controller')
router.use(auth)
router.post("/", createAlbum)
router.get("/withtracks", findAllAlbums)
router.get("/:id", findOneAlbum)
router.get("/withtracks/:id", findOneAlbumWithTrack)
router.put("/:id", updateAlbum)
router.delete("/:id", deleteAlbum)

module.exports = router


