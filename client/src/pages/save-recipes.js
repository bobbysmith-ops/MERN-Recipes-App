import {useEffect, useState} from "react"
import axios from "axios"
import { useGetUserID } from "../hooks/useGetUserID"


export const SavedRecipes = () => {

    const [savedRecipes,setSavedRecipes] = useState([])

    const userID = useGetUserID()

    /*when u want to do something asyncronous w/ useEffect, cant just make
    the useEffect callback async, have to declare an async func w/in the useEffect
    body then immediately call it*/
    useEffect(() => {

        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`)
                setSavedRecipes(response.data.savedRecipes)
            }
            catch (err) {
                console.error(err)
            }

        }


        fetchSavedRecipe()

    }, [])



    return ( 
    <div>
        <h1> Saved Recipes </h1>
        <ul>
            {savedRecipes.map((recipe)=>(
                <li key={recipe._id}>
                    <div>
                        <h2>{recipe.name}</h2>
                    </div>
                    <div className="instructions">
                        <p> {recipe.instructions}</p>
                    </div>
                    <img src={recipe.imageUrl} alt={recipe.name} />
                    <p> Cooking Time: {recipe.cookingTime} (minutes)</p>
                </li>
            ))}
        </ul>

    </div>


    )
}