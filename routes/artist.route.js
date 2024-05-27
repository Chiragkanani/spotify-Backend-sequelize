const router = require("express").Router();
const auth = require('../middlewares/auth.middleware');
const { createArtist,findAllArtists,findArtistById,updateArtist,deleteArtist,addArtistIntoUserFollow,removeArtistFromUserFollow } = require('../controllers/artist.controller')
router.use(auth)
router.post("/",createArtist )
router.get("/",findAllArtists )
router.get("/:id",findArtistById )
router.put("/:id",updateArtist)
router.delete("/:id",deleteArtist)
router.post("/addIntoUserFollow",addArtistIntoUserFollow);
router.post("/removeFromUserFollow",removeArtistFromUserFollow);

module.exports = router


// {
//     "firstName": "manil",
//     "lastName": "gawde",
//     "bio": "i am fan of my kanani"
// }