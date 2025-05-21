// import { asyncHandler } from "../utils/asyncHandler.js"

// import { Apierror } from "../utils/apiError.js"

// import jwt from "jsonwebtoken"

// import { User } from "../models/user.model.js"

// export const verifyJWT = asyncHandler(async(req,res,next)=>{

//     try {
//         const token = req.cookies?.accessToken || req.header
//         ("Authorization")?.replace("Bearer ","")

//         if(!token){
//             throw new Apierror(401,"Unautorized access")
//         }

//         const decodedToken = jwt.verify(token,"umesh")

//         const user = await User.findById(decodedToken?._id).select
//         ("-password -refreshToken")

//         if(!user){
//             throw new Apierror(401,"Invalid access")
//         }

//         req.user = user;
//         next()
//     }
//     catch (error) {
//         throw new Apierror(401,"invalid access token")
//     }

// })

import { asyncHandler } from "../utils/asyncHandler.js";
import { Apierror } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // 1. Extract token from cookies or headers
    const token =
      req.cookies?.accessToken ||
      req.headers["authorization"]?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    // 2. Verify token (replace "umesh" with process.env.JWT_SECRET in production)
    const decodedToken = jwt.verify(token, "umesh");

    // 3. Optional: Fetch user from DB (remove if you only need token data)
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // 4. Attach user to request
    req.user = user;
    next();
  } catch (error) {
    // 5. Handle specific JWT errors
    let errorMessage = "Invalid access token";
    if (error.name === "TokenExpiredError") {
      errorMessage = "Token expired";
    }
    throw new Apierror(401, errorMessage);
  }
});
