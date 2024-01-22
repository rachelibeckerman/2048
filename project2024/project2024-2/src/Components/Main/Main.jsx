import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

function Main() {

    const navigate = useNavigate();



    return (<>
        <h1>Main</h1>

        <button onClick={()=>{navigate('/login')}}>Sign in</button>
        <button onClick={()=>{navigate('/register')}}>Sign up</button> 
    </>
    )
}

export default Main;