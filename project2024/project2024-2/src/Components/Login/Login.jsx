import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'

function Login() {
    const [data, setData] = useState(null);
    const [login, setLogin] = useState(false)
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
    useEffect(() => {
        console.log("useffect")
        fetch(`http://localhost:3000/users?username=${currentUser.Name}&&website=${currentUser.Password}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data == [])
                    alert("You do not exist in the system, please register")
                else
                    setData(data)
            });
    }, [login])
    const handleSubmit = (event) => {
        console.log("handle")
        event.preventDefault();
        setLogin(true);
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
            <br />
            <button type="submit">Sign In</button>
        </form>

    </>
    )
}

export default Login;

///https://www.react-hook-form.com/form-builder