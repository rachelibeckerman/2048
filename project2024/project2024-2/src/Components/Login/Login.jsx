import React, { useState, useEffect, useRef,useContext } from "react";
import {  useNavigate } from 'react-router-dom'
import { appContax } from "../../App";

function Login() {
    const navigate = useNavigate();
    const {user, setUser} = useContext(appContax);
    const [login, setLogin] = useState(false)
    const [loginUser, setLoginUser] = useState({
        Name: "",
        Password: "",
    });
<<<<<<< HEAD
    console.log("login")
    console.log(user)
=======
   
>>>>>>> 0dd1b0b5b6b87b8bd78b591d0c361e0a2bea78ac
    useEffect(() => {
        if (login) {
            fetch(`http://localhost:3000/users?username=${loginUser.Name}&&website=${loginUser.Password}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.length == 0)
                        alert("First time we meet? Sign up")
                    else {
                        setUser(data);
                        localStorage.setItem("currentUser", JSON.stringify({ username: data.username, id: data.id }))
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
};

export default Login;
