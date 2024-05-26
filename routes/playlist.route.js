const router = require("express").Router();
const auth = require('../middlewares/auth.middleware');
const { createPlaylist,updatePlaylist,deletePlaylist,addPlaylistTrack,removePlaylistTrack,findUsersAllPlaylist,userPlaylistWithTrack } = require('../controllers/playlist.controller')
router.use(auth)
router.post("/", createPlaylist)
router.put("/:id", updatePlaylist)
router.delete("/:id", deletePlaylist)
router.post("/addtrack",addPlaylistTrack)
router.post("/removetrack",removePlaylistTrack)
router.get("/usersplaylist",findUsersAllPlaylist)
router.get("/userplaylistwithtrack/:id",userPlaylistWithTrack)
module.exports = router