import mongoose, { Schema } from "mongoose";
import argon2 from "argon2"; //argon2 is alternate of bcrypt
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    State: {
      type: String,
      // required: true,
      trim: true,
      index: true,
    },
    District: {
      type: String,
      // required: true,
      trim: true,
      index: true,
    },
    Area: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //CLOUDNARY url
      required: false,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

/************************* This code is no longer in use bcz bcrypt is outdated**************************************  */
// userSchema.pre("save", async function(next){
//     if(!this.isModified("password")) return next();
//     this.password = bcrypt.hash(this.password,8) //protecting aur encrypting password before saving
//     next()
// })

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await argon2.hash(this.password); // Hashing with argon2
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await argon2.verify(this.password, password);
};

userSchema.methods.isOtpCorrect = async function (r_otp) {
  if (r_otp === this.otp);
  return true;
};
//Use of JWT
// jwt is a bearer token

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    //payload or data
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    //token
    "umesh",
    //expiry
    {
      expiresIn: "1d",
    },
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    //payload or data
    {
      _id: this._id,
    },
    //token
    "pachal",
    //expiry
    {
      expiresIn: "10d",
    },
  );
};
export const User = mongoose.model("User", userSchema);
