import React from "react";
import {useContext} from "react"
import { Router, useLocation } from "react-router-dom";
import { appContax } from "../../App";

function Info() {
    const { user, setUser } = useContext(appContax);

    const printUser = (object) => {

        return Object.keys(object).map((key) => (typeof object[key] === 'object' ?
            <div key={key} >
                <br />
                <p>
                    <ins> <strong>{key + ":"}</strong></ins>  
                </p>
                {printUser(object[key])}
            </div> :
            <p key={key}>
                <b>{key} : </b>
                {object[key]}
            </p>
            ))
    }

    return (
        <>
            <h1>Info</h1>
            {user &&
                <span>
                    {printUser(user)}
                </span>}
        </>
    )
}


export default Info;