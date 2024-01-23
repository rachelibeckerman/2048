import React from "react";
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from "react"
import { appContax } from "../../App";

function SignUp() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(appContax);
    const [nextId, setNextId] = useState("");
    const [statusSignUp, setStatusSignUp] = useState("start");
    const [signupUser, setSignupUser] = useState(
        {
            Name: "",
            Password: "",
            PasswordConfirm: ""
        });

    const [formMasseges, setFormMasseges] = useState( {
            PasswordConfirm: ""
        });

    const [geo, setGeo] = useState({
        lat: "",
        lng: ""
    });

    const [address, setAddress] = useState(
        {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            geo: {
                lat: "",
                lng: ""

            }
        });

    const [company, setCompany] = useState(
        {
            name: "",
            catchPhrase: "",
            bs: ""
        }
    );

    useEffect(() => {
        fetch(`http://localhost:3000/nextId/1`)
            .then((res) => res.json())
            .then((dt) => {
                setNextId(dt.user)
            })
    }, []);

    const NextId = () => {
        fetch('http://localhost:3000/nextId/1', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: `${parseInt(nextId) + 1}` })
        }).then(response => response.json()).then(dt => { setNextId(dt.user) });
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSignupUser((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };

    const handleUserChange = (event) => {
        const { name, value } = event.target;
        setUser((prevProps) => ({
            ...prevProps,
            [name]: value
        }))
    }

    const handleAddressChange = (event) => {
        const { name, value } = event.target;
        setAddress((prevProps) => ({
            ...prevProps,
            [name]: value
        }))
    }

    const handleCompanyChange = (event) => {
        const { name, value } = event.target;
        setCompany((prevProps) => ({
            ...prevProps,
            [name]: value
        }))
    }

    const handleGeoChange = (event) => {
        const { name, value } = event.target;
        setGeo((prevProps) => ({
            ...prevProps,
            [name]: value
        }))
    }

    function handleRegistered(event) {
        event.preventDefault();
        const newUser = {
            id: nextId,
            name: user.name,
            username: signupUser.Name,
            email: user.email,
            address: {
                street: address.street,
                suite: address.suite,
                city: address.city,
                zipcode: address.zipcode,
                geo: geo
            },
            phone: user.phone,
            website: signupUser.Password,
            company: company
        };
        setUser(newUser);
        NextId();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        fetch('http://localhost:3000/users', requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log("data")
                console.log(data)
                localStorage.setItem("currentUser", JSON.stringify({ username: data.username, id: data.id }))
                navigate(`/users/${data.id}`);
            });
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        if (signupUser.Password != signupUser.PasswordConfirm)
            setFormMasseges((prevProps) => ({
                ...prevProps,
                PasswordConfirm: "password didn't match"
            }));
        else {
            fetch(`http://localhost:3000/users?username=${signupUser.Name}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.length > 0)
                        alert("We know you!! Sign In");
                    else {
                        setStatusSignUp("registered");
                    }
                });
        }
    };

    return (
        <>
            <button onClick={() => { navigate('/login') }}>Sign in</button>
            <h1>sign up</h1>
            <div>
                {statusSignUp == "start" ?
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="userName"
                            name="Name"
                            value={signupUser.Name}
                            onChange={handleInputChange}
                            required
                        />
                        <div style={{ color: "red" }}>{formMasseges.Name}</div>
                        <input
                            type="password"
                            placeholder="password"
                            name="Password"
                            value={signupUser.Password}
                            onChange={handleInputChange}
                            required
                        />
                        <div style={{ color: "red" }}>{formMasseges.Password}</div>
                        <input
                            type="password"
                            placeholder="confirm password"
                            name="PasswordConfirm"
                            value={signupUser.PasswordConfirm}
                            onChange={handleInputChange}
                            required
                        />
                        <div style={{ color: "red" }}>{formMasseges.PasswordConfirm}</div>
                        <button type="submit">Sign Up</button>
                    </form>
                    : <form onSubmit={handleRegistered}>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={user.name}
                            onChange={handleUserChange}
                            required
                        />
                        <br />
                        <input
                            type="email"
                            placeholder="email"
                            name="email"
                            value={user.email}
                            onChange={handleUserChange}
                            required
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="phone"
                            name="phone"
                            value={user.phone}
                            onChange={handleUserChange}
                            required
                        />
                        <br />
                        <span>address:</span>
                        <br />
                        <input
                            type="text"
                            placeholder="street"
                            name="street"
                            value={address.street}
                            onChange={handleAddressChange}
                            required
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="suite"
                            name="suite"
                            value={address.suite}
                            onChange={handleAddressChange}
                            required
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="city"
                            name="city"
                            value={address.city}
                            onChange={handleAddressChange}
                            required
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="zipcode"
                            name="zipcode"
                            value={address.zipcode}
                            onChange={handleAddressChange}
                            required
                        />
                        <br />
                        <span> geo: </span>
                        <br />
                        <input
                            type="text"
                            placeholder="lat"
                            name="lat"
                            value={geo.lat}
                            onChange={handleGeoChange}
                            required
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="lng"
                            name="lng"
                            value={geo.lng}
                            onChange={handleGeoChange}
                            required
                        />

                        <br />
                        <span> company:</span>
                        <br />
                        <input
                            type="text"
                            placeholder="name"
                            name="name"
                            value={company.name}
                            onChange={handleCompanyChange}
                            required
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="catchPhrase"
                            name="catchPhrase"
                            value={company.catchPhrase}
                            onChange={handleCompanyChange}
                            required
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="bs"
                            name="bs"
                            value={company.bs}
                            onChange={handleCompanyChange}
                            required
                        />
                        <br />
                        <button type="submit">Add</button>
                    </form>}
            </div>
        </>
    )
}

export default SignUp;

