import React, { useEffect } from "react";
import { Link, useNavigate, Outlet, useParams } from "react-router-dom";
import { useContext } from "react"
import { appContax } from "../../App";
import './Home.css'
function Home() {
    const navigate = useNavigate()
    const { user, setUser } = useContext(appContax);
    const { id } = useParams();

    useEffect(() => {
        const userLs = JSON.parse(localStorage.getItem("currentUser"));
        if (id == userLs.id) {
            fetch(`http://localhost:3000/users/${id}`)
                .then((res) => res.json())
                .then((data) => { setUser(data); });
        }
    }, []);

    const logOut = () => {
        localStorage.removeItem("currentUser");
        window.history.replaceState(null, null, '/');
        navigate('/login');
    }

    return (
        <>
            <div className="linksHome">
                <div>
                    <Link to={"todos"}><div className="linkHome">Todos</div></Link>

                </div>
                <div>
                    <Link to={"posts"}><div className="linkHome">Posts</div></Link>
                </div>
                <div>
                    <Link to={"albums"} ><div className="linkHome">Albums</div></Link>
                </div>
                <div>
                    <Link to={"info"}><div className="linkHome">Info</div></Link>
                </div>
                <button className="logOutButton" onClick={logOut}>Log Out</button>
            </div>
            <div className="nameUser"> {user && <h2>Hi, {user.name}</h2>}</div>
           
            <Outlet />
        </>
    );
}

export default Home;