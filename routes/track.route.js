const router = require("express").Router();
const auth = require('../middlewares/auth.middleware');
const {createTrack,findAllTracks,findByPk,deleteTrack,updateTrack,addTrackToUserLiked,removeTrackToUserLiked,usersLikedTracksCollection} = require("../controllers/track.controller");
const trackUpload  = require("../services/trackUpload");


router.use(auth)
router.post("/", trackUpload,createTrack)
router.get("/", findAllTracks)
router.get("/:id", findByPk)
router.delete("/:id", deleteTrack)
router.put("/:id", updateTrack);
router.post("/addtracktouserliked", addTrackToUserLiked);
router.post("/removetracktouserliked", removeTrackToUserLiked);
router.get("/usersLikedTracksCollection/:id", usersLikedTracksCollection);

module.exports = router


