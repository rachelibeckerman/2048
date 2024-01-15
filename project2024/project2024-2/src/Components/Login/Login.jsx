import React, { useState, useEffect, useRef } from "react";
import {  useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [login, setLogin] = useState(false)
    const [loginUser, setLoginUser] = useState({
        Name: "",
        Password: "",
    });

    useEffect(() => {
        if (login) {
            console.log("useffect")
            fetch(`http://localhost:3000/users?username=${loginUser.Name}&&website=${loginUser.Password}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.length == 0)
                        alert("First time we meet? Sign up")
                    else {
                        setUser(data);
                        localStorage.setItem("currentUser", JSON.stringify(data))
                       navigate(`/users/${data[0].id}`);
                    }
                });
        }
    }, [login])

    const handleInputChange = (event) => {
        setLogin(false);
        const { name, value } = event.target;
        setLoginUser((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        console.log("handle")
        event.preventDefault();
        setLogin(true);
    };


    return (<>
        <button onClick={() => { navigate('/register') }}>Sign up</button>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="userName"
                name="Name"
                value={loginUser.Name}
                onChange={handleInputChange}
                required
            />
            <br />
            <input
                type="password"
                placeholder="password"
                name="Password"
                value={loginUser.Password}
                onChange={handleInputChange}
                required
            />
            <br />
            <button type="submit">Sign In</button>
        </form>

    </>
    )
}

export default Login;

///https://www.react-hook-form.com/form-builder
//