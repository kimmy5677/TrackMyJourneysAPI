const { Router } = require("express")
const userController = require('../controllers/userController')

const router = Router();

router.get("/", userController.getUsers);
router.post("/register", userController.newUser);
router.post("/login", userController.loginUser);

module.exports = router