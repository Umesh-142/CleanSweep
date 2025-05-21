import { asyncHandler } from "../utils/asyncHandler.js";

import { Apierror } from "../utils/apiError.js";

import { User } from "../models/user.model.js";

import mongoose from "mongoose";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import SendEmail from "../middleware/Email.config.js";

import cookieParser from "cookie-parser";

import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("The main error is = ", error);
    throw new Apierror(
      500,
      "Something went wrong while generating referesh and access token",
    );
  }
};
//Register user and send otp on email
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password, State, District, Area } =
    req.body;
  // console.log(req.body);

  if (
    [fullName, email, username, password, State, District, Area].some(
      (field) => field?.trim() === "",
    )
  ) {
    throw new Apierror(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new Apierror(409, "User with email or username already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  if (!avatarLocalPath) {
    throw new Apierror(400, "AvatarFile is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new Apierror(400, "AvatarFile is required");
  }
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    email,
    Area,
    District,
    State,
    username: username.toLowerCase(),
    password,
    otp,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  SendEmail(user.email, otp);

  if (!createdUser) {
    throw new Apierror(500, "something went wrong while registering a user");
  }
  console.log("User Registered Successfully");
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Succesfully"));
});

//Verify User Email
const Verify_Email = asyncHandler(async (req, res) => {
  try {
    const { email, username, otp } = req.body;

    if (!username && !email) {
      throw new Apierror(400, "username or email is required");
    }
    if (!otp) {
      throw new Apierror(400, "otp is required");
    }
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      throw new Apierror(404, "User Does not exist");
    }

    if (otp === user.otp) {
      user.isVerified = true;
      console.log(user.isVerified, "User is verified");
      await user.save();
      return res
        .status(201)
        .json(new ApiResponse(200, user, "User verified successfully"));
    } else {
      throw new Apierror(404, "otp is incorrect");
    }
  } catch (e) {
    console.log("THE error is = ", e);
    throw new Apierror(404, "Error while verifying");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  //To do
  // req body -> data
  // username or email check
  // find the user
  // check password
  // access and refresh token
  // send secure cookies

  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new Apierror(400, "usrename or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new Apierror(404, "User Does not exist");
  }

  if (user.isVerified == false) {
    console.log("User is not verified");

    throw new Apierror(404, "User is not verified");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new Apierror(401, "Incorrect passsword");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id,
    user,
  );

  const LoggedIn_user = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  console.log("LOGIN SUCESS !!");
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: LoggedIn_user,
          accessToken,
          refreshToken,
        },
        "User logged in Successfully",
      ),
    );
});

const logout_user = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    },
  );
  console.log("logged out successfully");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json(new ApiResponse(401, null, "Unauthorized"));
    }
    res
      .status(200)
      .json(
        new ApiResponse(200, req.user, "Current User Fetched Successfully"),
      );
  } catch (error) {
    res.status(500).json(new ApiResponse(500, null, "Server Error"));
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new Apierror(401, "Unauthorised Request");
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, "panchal");

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new Apierror(401, "Unauthorised Request");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new Apierror(401, "Refresh Token is expired");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { new_accessToken, new_refreshToken } =
      await generateAccessAndRefereshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", new_accessToken, options)
      .cookie("refreshToken", new_refreshToken, options).json;
    {
      new ApiResponse(
        200,
        {
          accessToken: new_accessToken,
          refreshToken: new_refreshToken,
        },
        "Access Token Refreshed",
      );
    }
  } catch (e) {
    throw new Apierror(401, e?.message || "invalid access token");

    console.log("The error is : ", e);
  }
});

export {
  registerUser,
  Verify_Email,
  loginUser,
  logout_user,
  getCurrentUser,
  refreshAccessToken,
};
