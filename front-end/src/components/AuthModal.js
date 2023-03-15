import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
/* "username": "string",
  "password": "string",
  "name": "string",
  "email": "string",
  "gender": "string",
  "location": "string",
  "avatar": "string",
  "date_Of_Birth": "2023-03-13T06:09:54.981Z"*/ 

const AuthModal = ({ setShowModal, isSignUp }) => {

    const [ username, setUsername ] = useState(null)
    const [ password, setPassword ] = useState(null)
    const [ confirmPassword, setConfirmPassword ] = useState(null)

    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [ error, setError ] = useState(null)
    const navigate = useNavigate()

    console.log(username, password, confirmPassword)

    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (isSignUp && (password !== confirmPassword)) {
                setError('Passwords need to match!')
                return
            }
            else
            {
                if(!isSignUp)
                {
                    const response = await axios.post("https://localhost:7059/api/Users/Login", {username, password});
                    console.log(response.data)
                    setCookie('AuthToken', response.data.token)
                    setCookie('UserId', response.data.id)                    
                    // assuming the API returns a success message in the response
                    if (response.data.success) {
                        navigate('/dashboard');
                    } 
                    else {
                        alert("Username or Password is invalid!"); // display an error message
                    }
                }
                else
                {
                    const response2 = await axios.post("https://localhost:7059/api/Users/Login", {username, password});
                    console.log(response2.data)                    
                    // assuming the API returns a success message in the response
                    if (isSignUp && !response2.data.success) {
                        setCookie('Username', username)
                        setCookie('Password', password)
                        navigate('/onboarding'); // navigate to the onboarding page
                    }                     
                    else {
                        alert("Username already exist!"); // display an error message
                    }
                }                
            }
          } 
          catch (error) {
            console.log(error);
          }
    }    

    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>ⓧ</div>
            <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
            <p>By clicking Log In, you agree to our terms. Learn how we process your data in out Privacy Policy and Cookie Policy.</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    required={true}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && <input 
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}               
                <input className="secondary-button" type="submit"/>
                <p>{error}</p>
            </form>
            <hr/>
            <h2>GET THE APP</h2>
        </div>
    )
}

export default AuthModal