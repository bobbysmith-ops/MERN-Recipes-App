import { useState } from "react"
import axios from 'axios'
import {useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom"

export const Auth = () => {
    return ( 
        <div className="auth">
            <Login />
            <Register />
        </div>
    )
}



//creating the Login and Register components in the same file that they're being used
const Login = () => {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    //dont need access to the cookies, just function that sets the cookies
    const [_, setCookies] = useCookies(["access_token"])//name of cookie we want to use is access_token

    const navigate = useNavigate()

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post("http://localhost:3001/auth/login", {username, password})//store the response this time bc u need the token
            setCookies("access_token", response.data.token)//use a cookie to store the authorization token we receive from the back end
            window.localStorage.setItem("userID", response.data.userID)//also store our user ID we're sending back inside our local storage for quick access
            navigate("/")//use this to navigate back to the homepage
        } catch(err){
            console.error(err)
        }
    }

    return (
        <Form 
        username = {username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Login"
        onSubmit={onSubmit}
        />
    )
}



const Register = () => {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const onSubmit = async (event) => {
        event.preventDefault()//this stops page from refreshing when you submit the form
        try {
            await axios.post("http://localhost:3001/auth/register", {username,password})//2nd arg is the object for the body of the request, recall when we wrote the backend we assumed we would be sending a username and password in the body of the post request
            alert("Registration Completed! Now login.")
        } catch (err){
            console.error(err)
        }
    }

    return (
        <Form 
            username = {username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Register"
            onSubmit={onSubmit}
        />
    )
}


//the login and register components will be almost the same
//create another component called Form to reuse in the Login and Registration components
//the Form component can have these 5 arguments (props) that we pass stuff in for
const Form = ({username, setUsername, password, setPassword, label, onSubmit}) => {
    return (
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h2> {label} </h2>
                <div className="form-group">
                    <label htmlFor="username"> Username: </label> {/*when u have a label representing a field, have to put the matching htmlFor to tell ui that its representing the input below */}
                    <input 
                        type="text" 
                        id="username" 
                        value = {username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password"> Password: </label> 
                    <input 
                        type="password" 
                        id="password" 
                        value = {password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <button type="submit"> {label} </button>
            </form>
        </div>
    )
}