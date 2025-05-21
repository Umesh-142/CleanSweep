import { Router } from "express";

import {
  registerUser,
  loginUser,
  logout_user,
  Verify_Email,
  getCurrentUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";

import { upload } from "../middleware/multer.middleware.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser,
); //Now the url becomes http://localhost:8000/api/v1/users/register

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logout_user);

router.route("/verify").post(Verify_Email);

router.route("/getCurrentUser").get(verifyJWT, getCurrentUser);

router.route("/refresh").get(refreshAccessToken);

export default router;
