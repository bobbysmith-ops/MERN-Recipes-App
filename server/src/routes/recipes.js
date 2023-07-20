import express from 'express'
import mongoose from 'mongoose'
import { RecipeModel } from "../models/Recipes.js";//make sure to put Recipes.js
import { UserModel } from '../models/Users.js';


const router = express.Router()


//use this route to get a list of all our recipes
router.get("/", async (req,res)=> {
    try {
        const response = await RecipeModel.find({})//empty object means return all the documents in that collection
        res.json(response)

    } catch (err) {
        res.json(err)
    }
})


//route to create a new recipe
//these are routes we test with insomnia
router.post("/", async (req,res)=> {
    const recipe = new RecipeModel(req.body)//this is a fast way to say we're setting the object to have the fields of req.body
    try {
        const response = await recipe.save()
        res.json(response)

    } catch (err) {
        res.json(err)
    }
})


//route to save a recipe
router.put("/", async (req,res)=> {
    
        const recipe = await RecipeModel.findById(req.body.recipeID)
        const user = await UserModel.findById(req.body.userID)
    try {
        user.savedRecipes.push(recipe)
        await user.save()
        res.json({savedRecipes: user.savedRecipes})

        } catch (err) {
        res.json(err)
        }
})


//get list of all recipe IDs that logged in user has saved (?)
router.get("/savedRecipes/ids/:userID", async (req,res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        res.json({savedRecipes: user?.savedRecipes})//add the question mark in case user is null
    } catch (err) {
        res.json(err)
    }
})


//get just the saved recipes and not the IDs
router.get("/savedRecipes/:userID", async (req,res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        const savedRecipes = await RecipeModel.find({_id: {$in: user.savedRecipes}})//grab the saved recipes whos _id is in user.saveRecipes, using some more advanced mongoose syntax here
        res.json({savedRecipes})
    } catch (err) {
        res.json(err)
    }
})




export {router as recipesRouter}