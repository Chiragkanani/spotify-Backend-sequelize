const router = require("express").Router();
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const artistRoutes = require('./artist.route');
const albumRoutes = require('./album.route');
const trackRoutes = require('./track.route');
const playlistRoutes = require('./playlist.route');

router.use("/auth",authRoutes);
router.use("/users",userRoutes);
router.use("/artists",artistRoutes);
router.use("/albums",albumRoutes);
router.use("/tracks",trackRoutes);
router.use("/playlist",playlistRoutes);

module.exports = router