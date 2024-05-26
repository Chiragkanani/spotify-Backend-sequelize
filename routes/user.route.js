const router = require("express").Router();
const { findAllUsers,createUser,findUserById,userUpdate } = require("../controllers/user.controller")
const auth = require('../middlewares/auth.middleware');

router.use(auth)
router.get("/",findAllUsers);
router.get("/:id",findUserById);
router.put("/:id",userUpdate);
router.post("/",createUser);
module.exports = router

// {
//     "firstName": "chirag",
//         "lastName": "Kanani",
//             "email": "meetkanani2003@gmail.com",
//                 "password": "123456"
// }