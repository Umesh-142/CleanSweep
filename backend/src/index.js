// require('dotenv').config({path:'.env/'})
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`SERVER is running at Port ${process.env.PORT}`);
    });
  })
  .catch((e) => {
    console.log("MondoDB Connection failed");
  });

/*
import mongoose, { connect } from 'mongoose'
import { DB_NAME } from './constants'
import express from 'express'
const app = express()
// function connectDB(){}
// connectDB()

( async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("Error:",error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`app is listening on port ${process.env.PORT}`);         
        })
    }
    catch(e){
        console.log("Error:",e);
        throw err
    }
})()

*/
