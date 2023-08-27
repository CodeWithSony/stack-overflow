// import express from 'express' we will do it if we done like type module in package.json
// const express = require('express'); while using common.js from package.json
import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import thunk from "redux-thunk";
import userRouter from "./routes/users.js";
import questionRouter from "./routes/Question.js";
import answerRoutes from "./routes/Answers.js";
// const { MongoClient, ServerApiVersion } = require('mongodb');
// import {MongoClient, ServerApiVersion} from "mongodb"
// in node js we give full path as .js but in react we only give path till users not users.js
// but we need mongodb atlas
import connectDB from "./Config/db.js"

dotenv.config();

// connectDB()

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/user", userRouter);
app.use("/questions", questionRouter);
app.use("/answer", answerRoutes);

const DATABASE_URL = process.env.CONNECTION_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err));




  // 
  // const client = new MongoClient(DATABASE_URL, {
  //   serverApi: {
  //     version: ServerApiVersion.v1,
  //     strict: true,
  //     deprecationErrors: true,
  //   }
  // });
  // async function run() {
  //   try {
  //     // Connect the client to the server	(optional starting in v4.7)
  //     await client.connect();
  //     // Send a ping to confirm a successful connection
  //     await client.db("admin").command({ ping: 1 });
  //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
  //   } finally {
  //     // Ensures that the client will close when you finish/error
  //     await client.close();
  //   }
  // }
  // run().catch(console.dir);