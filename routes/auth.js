import { Router } from "express";
import { registerUser, loginUser, getUser } from "../controllers/auths";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.route("/user").get(authenticate, getUser);

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

export default router;
