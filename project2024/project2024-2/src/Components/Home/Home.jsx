import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useContext } from "react"
import { appContax } from "../../App";

function Home() {
    const navigate = useNavigate()
    const { user, setUser } = useContext(appContax);
    const logOut = () => {
        localStorage.removeItem("currentUser");
        window.history.replaceState(null, null, '/');
        navigate('/');
    }

    return (
        <>
            <button onClick={logOut}>Logout</button>
            <h1>Home</h1>
            <h2>{user.name}</h2>
            <Link to={"todos"}><div>Todos</div></Link>
            <Link to={"posts"}><div>Posts</div></Link>
            <Link to={"albums"} ><div>Albums</div></Link>
            <Link to={"info"}><div>Info</div></Link>

            <Outlet />
        </>
    );
}

export default Home;
//null, null, '/'