import React from "react";
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
function SignUp() {
    const navigate = useNavigate()
    const [signUp, setSignUp] = useState(false)
    const [registerUser, setRegisterUser] = useState(
        {
            Name: "",
            Password: "",
            PasswordConfirm: ""
        }
    )
    // const confirmPassword = () => {
    //     if (registerUser.Password != registerUser.PasswordConfirm)
    //    return <h6>it not match</h6>
    // }
    // useEffect(() => {
    //     if (signUp) {
    //         console.log("useffect")
    //         fetch(`http://localhost:3000/users?username=${registerUser.Name}&&website=${registerUser.Password}`)
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 console.log(data)
    //                 if (data.length == 0)
    //                     alert("First time we meet? Sign up")
    //                 else {
    //                     //setUser(data);
    //                     localStorage.setItem("currentUser", JSON.stringify(data));
    //                     navigate("/home");
    //                 }
    //             });
    //     }
    // }, [signUp])

    const handleInputChange = (event) => {
        // setSignUp(false);
        const { name, value } = event.target;
        setRegisterUser((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        console.log("handle")
        event.preventDefault();
        if (registerUser.Password != registerUser.PasswordConfirm)
            alert("password didn't match")
        else{

            
        }
    };

    return (
        <>
            <button onClick={() => { navigate('/login') }}>Sign in</button>
            <h1>sign up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="userName"
                    name="Name"
                    value={registerUser.Name}
                    onChange={handleInputChange}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="password"
                    name="Password"
                    value={registerUser.Password}
                    onChange={handleInputChange}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="confirm password"
                    name="PasswordConfirm"
                    value={registerUser.PasswordConfirm}
                    onChange={handleInputChange}
                    required
                />
                <br />
                <button type="submit">Sign In</button>
            </form>
        </>
    )
}

export default SignUp;