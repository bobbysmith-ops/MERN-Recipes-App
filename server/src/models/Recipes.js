import mongoose from 'mongoose'

const RecipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    ingredients: [{type: String, required: true}],//use an arrow for this bc we'll have multiple ingredients
    instructions: {type: String, required: true},
    imageUrl: {type: String, required: true},
    cookingTime: {type: Number, required: true},
    userOwner: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true}//in mongodb there's usually a specific type that refers to ids
})


export const RecipeModel = mongoose.model("recipes", RecipeSchema)
