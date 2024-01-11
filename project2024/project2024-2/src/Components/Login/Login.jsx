import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
function Login() {

    const [currentUser, setCurrentUser] = useState({
        Name: "",
        Password: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentUser((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(currentUser);
    };

   
    return (<>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="userName"
                name="Name"
                value={currentUser.Name}
                onChange={handleInputChange}
            />
            <br />
            <input
                type="text"
                placeholder="password"
                name="Password"
                value={currentUser.password}
                onChange={handleInputChange}
            />
            <button type="submit">Sign In</button>
        </form>

    </>
    )
}

export default Login;

