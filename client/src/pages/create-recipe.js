import { useState } from "react"

export const CreateRecipe = () => {

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: 0,
    })

    //since most inputs will be similar, instead of doing an onChange, make a function and use that for each
    //this function will take in an event, ie. the event is the argument
    const handleChange = (event) => {
        const {name, value} = event.target
        setRecipe({...recipe, [name]: value})//change just one property of the recipe state object like this, you set name to value
    }

    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})
    }


    return (
            <div className="create-recipe">
                <h2> Create Recipe</h2>
                <form>
                    <label htmlFor="name"> Name </label>
                    <input type="text" id="name" name="name" onChange={handleChange} />
                    <label htmlFor="ingredients">Ingredients</label>
                    
                    <button onClick={addIngredient}> Add Ingredient </button>


                    <label htmlFor="instructions">Instructions</label>
                    <textarea id="instructions" name="intructions" onChange={handleChange}></textarea>
                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="text" id="imageUrl" name="imageUrl" />
                    <label htmlFor="cookingTime">Cooking Time (minutes)</label>
                    <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}/>
                </form>
            </div>
    )
}