import React from "react";
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
function SignUp() {
    const navigate = useNavigate();
    const [signUp, setSignUp] = useState(false);
    const [statusSignUp, setStatusSignUp] = useState("start");
    const [registerUser, setRegisterUser] = useState(
        {
            Name: "",
            Password: "",
            PasswordConfirm: ""
        }
    )
    const [formMasseges, setFormMasseges] = useState(
        {
            Name: "",
            Password: "",
            PasswordConfirm: ""
        }
    )
    const [geo,setGeo]=useState({
        lat: "",
        lng: ""
    })
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
        })
    const [company, setCompany] = useState(
        {
            name: "",
            catchPhrase: "",
            bs: ""
        }
    );
    const [user, setUser] = useState(
        {
            id: "1666",
            name: "",
            username: "y",
            email: "",
            address: {
                street: "",
                suite: "",
                city: "y",
                zipcode: "",
                geo: {
                    lat: "",
                    lng: ""
                }
            },
            phone: "",
            website: "",
            company: {
                name: "",
                catchPhrase: "",
                bs: ""
            }
        }
    );



    console.log(user);
 
    useEffect(() => {
        if (signUp) {
            console.log("useffect signup")
            fetch(`http://localhost:3000/users?username=${registerUser.Name}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if (data.length > 0)
                        alert("We know you!! Sign In");
                    else {
                        setStatusSignUp("registered")
                      
                    }
                });
        }
    }, [signUp])

    const handleInputChange = (event) => {
        // setSignUp(false);
        const { name, value } = event.target;
        setRegisterUser((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };
    const handleRegisteredChange = (event) => {
        const { name, value } = event.target;
        setUser((prevProps) => ({
            ...prevProps,
            [name]: value
        }))
        console.log(user);
    }
    const handleRegisteredAddressChange = (event) => {
        const { name, value } = event.target;
        setAddress((prevProps) => ({
            ...prevProps,
            [name]: value
        }))
        console.log(address);
    }

    const handleRegistered = (event) => {
        // console.log("handle Registered")
        event.preventDefault();

        // setUser((prevProps) => ({
        //     ...prevProps,
        //     address: address
        // }));
        // console.log(user)
        // setSignUp(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        fetch('http://localhost:3000/users', requestOptions)
        .then(response => response.json())
        .then(data => alert("ff"));
     

    }
 
    const handleSubmit = (event) => {
        console.log("handle")
        event.preventDefault();
        if (registerUser.Password != registerUser.PasswordConfirm)
            setFormMasseges((prevProps) => ({
                ...prevProps,
                PasswordConfirm: "password didn't match"
            }));
        else {
            setSignUp(true);
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
                            value={registerUser.Name}
                            onChange={handleInputChange}
                            required
                        />
                        <div style={{ color: "red" }}>{formMasseges.Name}</div>
                        <input
                            type="password"
                            placeholder="password"
                            name="Password"
                            value={registerUser.Password}
                            onChange={handleInputChange}
                            required
                        />
                        <div style={{ color: "red" }}>{formMasseges.Password}</div>
                        <input
                            type="password"
                            placeholder="confirm password"
                            name="PasswordConfirm"
                            value={registerUser.PasswordConfirm}
                            onChange={handleInputChange}
                            required
                        />
                        <div style={{ color: "red" }}>{formMasseges.PasswordConfirm}</div>
                        <button type="submit">Sign Up</button>
                    </form>
                    : <form onSubmit={handleRegistered}>
                        {/* <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={user.name}
                            onChange={dd}
                            required
                        /> 
                       <br />
                        <input
                            type="email"
                            placeholder="email"
                            name="email"
                            value={user.email}
                            onChange={handleRegisteredChange}
                            required
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="phone"
                            name="phone"
                            value={user.phone}
                            onChange={handleRegisteredChange}
                            required
                        />
                        <br />
                        <span>address:</span>
                        <br />
                        <input
                            type="text"
                            placeholder="street"
                            name="street"
                            value={user.address.street}
                            onChange={dd}
                            required
                        />
                        <br />
                           <input
                            type="text"
                            placeholder="suite"
                            name="suite"
                            value={address.suite}
                            onChange={handleRegisteredAddressChange}
                            required
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="city"
                            name="city"
                            value={address.city}
                            onChange={handleRegisteredAddressChange}
                            required
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="zipcode"
                            name="zipcode"
                            value={address.zipcode}
                            onChange={handleRegisteredAddressChange}
                            required
                        />
                        <br />
                        <span> geo: </span>
                        <br />
                        <input
                            type="text"
                            placeholder="lat"
                            name="geo.lat"
                            value={address.geo.lat}
                            onChange={handleRegisteredAddressChange}
                            required
                        />
                        <br />
                      <input
                            type="text"
                            placeholder="lng"
                            name="lng"
                            value={address.geo.lng}
                            onChange={handleRegisteredAddressChange}
                            required
                        /> 

                      // <br />
                        // <span> company:</span>
                        // <br />
                        // <input
                        //     type="text"
                        //     placeholder="name"
                        //     name="name"
                        //     value={user.company.name}
                        //     onChange={handleRegisteredChange(event.target, setUser)}
                        //     required
                        // />
                        // <br />
                        // <input
                        //     type="text"
                        //     placeholder="catchPhrase"
                        //     name="catchPhrase"
                        //     value={user.company.catchPhrase}
                        //     onChange={handleRegisteredChange(event.target, setUser)}
                        //     required
                        // />
                        // <br />
                        // <input
                        //     type="text"
                        //     placeholder="bs"
                        //     name="bs"
                        //     value={user.company.bs}
                        //     onChange={handleRegisteredChange(event.target, setUser)}
                        //     required
                        // /> */}
                        <br />
                        <button type="submit">Add</button>
                    </form>}
            </div>
        </>
    )
}

export default SignUp;

// const [user ,setUser] = useState(
//     {
//         "id": "",
//         "name": "",
//         "username": "",
//         "email": "",
//         "address": {
//           "street": "",
//           "suite": "",
//           "city": "",
//           "zipcode": "",
//           "geo": {
//             "lat": "",
//             "lng": ""
//           }
//         },
//         "phone": "",
//         "website": "",
//         "company": {
//           "name": "",
//           "catchPhrase": "",
//           "bs": ""
//         }
//       }
// );