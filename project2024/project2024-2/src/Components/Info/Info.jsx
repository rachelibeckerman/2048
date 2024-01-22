import React from "react";
import { Router, useLocation } from "react-router-dom";
function Info() {
    const user = useLocation().state;
    console.log(user)

    return (
        <>
            <h1>Info</h1>
            <span>
                <b>{user.name}</b>
                <br />
                username : {user.username}   <br />
                
                email : {user.email}  <br />
                phone : {user.phone} <br />
                website : {user.website} <br />
                <br />
                address :
                <br />
                street: {user.address.street} <br />
                suite: {user.address.suite} <br />
                city: {user.address.city} <br />
                zipcode: {user.address.zipcode} <br />
                <br />
                geo: 
                <br />
                lat: {user.address.geo.lat} <br />
                lng: {user.address.geo.lng} <br />
                <br />
                company: 
                <br />
                name: {user.company.name} <br />
                catchPhrase: {user.company.catchPhrase} <br />
                bs: {user.company.bs} <br />
            </span>
        </>
    )
}
export default Info;