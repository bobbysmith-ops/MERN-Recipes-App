import { useState } from "react"
import axios from 'axios'
import { useGetUserID} from "../hooks/useGetUserID"
import {useNavigate} from 'react-router-dom'

export const CreateRecipe = () => {

    const userID = useGetUserID();

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
    })

    const navigate = useNavigate()


    //since most inputs will be similar, instead of doing an onChange, make a function and use that for each
    //this function will take in an event, ie. the event is the argument
    const handleChange = (event) => {
        const {name, value} = event.target
        setRecipe({...recipe, [name]: value})//change just one property of the recipe state object like this, you set name to value
    }

    const handleIngredientChange = (event, idx) => {
        const {value} = event.target
        const ingredients = recipe.ingredients
        ingredients[idx]=value
        setRecipe({...recipe, ingredients})
    }

    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()//stop page from reloading everytime we submit form
        try {
            await axios.post("http://localhost:3001/recipes", recipe)
            alert("Recipe Created")
            navigate("/")//navigate to the home page
        } catch (err) {
            console.error(err)
        }
    }

    return (
            <div className="create-recipe">
                <h2> Create Recipe</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name"> Name </label>
                    <input type="text" id="name" name="name" onChange={handleChange} />


                    <label htmlFor="ingredients">Ingredients</label>
                    {recipe.ingredients.map((ingredient, idx)=>(
                        <input
                            key={idx}
                            type="text"
                            name="ingredients"
                            value={ingredient}
                            onChange={(event)=>handleIngredientChange(event,idx)}
                        />
                    ))}
                    <button onClick={addIngredient} type="button"> Add Ingredient </button>


                    <label htmlFor="instructions">Instructions</label>
                    <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>

                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={recipe.imageUrl} onChange={handleChange} />

                    <label htmlFor="cookingTime">Cooking Time (minutes)</label>
                    <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}/>
                    <button type="submit">Create Recipe</button>
                </form>
            </div>
    )
}