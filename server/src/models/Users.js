import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    savedRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipes"}]//reference the recipes table
})

//create a model that will be generated based on that schema we made
export const UserModel = mongoose.model("users", UserSchema)


