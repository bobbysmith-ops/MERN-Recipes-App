//const express = require("express")
import express from "express"
import cors from 'cors'//set up rules for connection from front end to backend, enable express middleware to enable CORS w/ various options
import mongoose from 'mongoose'

import { userRouter } from "./routes/users.js";//need to add .js at end since using import notation in the backend stuff here, otherwise will get an error
import { recipesRouter } from "./routes/recipes.js"


const app = express()//create our express application, recall we use express to deal w/ node.js for our backend

app.use(express.json())//any request from front end will convert data to json
app.use(cors())//this will solve issues when making api request from front end, basically only time we use cors in the whole project

app.use("/auth", userRouter)//set up the route/endpoint for our userRouter, all routes/endpoints we create for userRouter will start with /auth
app.use("/recipes", recipesRouter)//set up the route for our recipesRouter, all routes we create for recipesRouter will start with /recipes



//generate mongoose connection to the db server
mongoose.connect("mongodb+srv://bobbysmith1994:MERNpassword123@recipes.89vexqd.mongodb.net/recipes?retryWrites=true&w=majority")







//2nd arg below is the callback function to run when the server starts, we use an arrow functions here to save time so we don't have to declare a function and then call it 
app.listen(3001, ()=> console.log("SERVER STARTED"))//start our api listening on this port





