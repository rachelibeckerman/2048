import React, { useEffect } from "react";
import { Link, useNavigate, Outlet, useParams } from "react-router-dom";
import { useContext } from "react"
import { appContax } from "../../App";

function Home() {
    ///////////////////////////////////////////////////
    const navigate = useNavigate()
    const { user, setUser } = useContext(appContax);
    const { id } = useParams();

    useEffect(() => {
        const userLs = JSON.parse(localStorage.getItem("currentUser"));
        if (id == userLs.id) {
            fetch(`http://localhost:3000/users/${id}`)
                .then((res) => res.json())
                .then((data) => { setUser(data);  });
        }
    }, []);

    const logOut = () => {
        localStorage.removeItem("currentUser");
        window.history.replaceState(null, null, '/');
        navigate('/login');
    }

    return (
        <>
            <button onClick={logOut}>Logout</button>
            <h1>Home</h1>
            {user && <h2>{user.name}</h2>}
            <Link to={"todos"}><div>Todos</div></Link>
            <Link to={"posts"}><div>Posts</div></Link>
            <Link to={"albums"} ><div>Albums</div></Link>
            <Link to={"info"}><div>Info</div></Link>
            <Outlet />
        </>
    );
}

export default Home;