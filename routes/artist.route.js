const router = require("express").Router();
const auth = require('../middlewares/auth.middleware');
const { createArtist,findAllArtists,findArtistById,updateArtist,deleteArtist } = require('../controllers/artist.controller')
router.use(auth)
router.post("/",createArtist )
router.get("/",findAllArtists )
router.get("/:id",findArtistById )
router.put("/:id",updateArtist)
router.delete("/:id",deleteArtist)

module.exports = router


// {
//     "firstName": "manil",
//     "lastName": "gawde",
//     "bio": "i am fan of my kanani"
// }