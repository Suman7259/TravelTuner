import {Router} from "express"
import { signupUser,loginUser,logoutUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()

router.get("/", (req, res) => {
  res.json([{ id: 1, name: "Test User" }]);
});

router.route("/signup").post(signupUser)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,logoutUser)

export default router