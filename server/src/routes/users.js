//users route will encompass everything related to logging in and registering
//aka all endpoints related to authentication will exist in this file

import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js'//make sure to put Users.js

const router = express.Router()


//recall we'll use an asyncchronous callback function, pretty much every callback in express will have a req and a res
//we are in the back end right now
//req is for getting data from whoever made the api request to this endpoint, ie. getting data from the front end client
//res is used to send data back to whoever made the api request, ie. sending data back to the front end client
router.post("/register", async (req, res) => {
    const {username, password} = req.body//when we make this api request in the front end, make sure we send username and password in the body of the request

    //using our db, we'll ccheck if a user w/ this username exists in the db, that user will be stored in variable user
    const user = await UserModel.findOne({username: username});

    //if the user already in the database, it won't return null and the if statement will trigger
    if (user) {
        return res.json({message: "User already exists"})
    }

    //if we reach this point, user isn't already in the db so we're good to go to create this user

    const hashedPassword = await bcrypt.hash(password, 10)//use bcrypt to hash the password, so its not stored in the db as plain text

    //add the user to the db
    const newUser = new UserModel({username: username, password: hashedPassword})
    await newUser.save()//actually saving it to the db


    res.json({message: "User Registered Successfully"});//send back a message to the front end
})




router.post("/login", async (req,res)=>{
    const {username, password} = req.body//similar to register, get a username and password from front end
    const user = await UserModel.findOne({username: username});//similar to register, check if the username is in the database

    if (!user){
        return res.json({message: "User Doesn't Exist"})//if the findOne returns null, the user isn't in the db and the if statement will trigger
    }

    //recall password is stored hashed in the db
    //compare the password we're sending from front end with this post request (1st arg) with the original password stored in the db (2nd arg)
    //if the compared passwords are the same, the promise will return true, otherwise false
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid){
        return res.json({message:"Username or Password Is Incorrect"})
    }

    //if we reach this point, login is correct and start process for correctly logging in
    const token = jwt.sign({id: user._id}, "secret")//create a token using jsonwebtoken library, sign the user id

    res.json({token, userID: user._id})//send the token back to the front end, along w the user id

})




export { router as userRouter }; //export router as an object named userRouter


export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, "secret", (err)=> {
            if(err) return res.sendStatus(403)//user not autthorized code
            next()
        })
    } else {
        res.sendStatus(401)
    }
}



