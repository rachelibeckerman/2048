import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import{useContext} from "react"
import { appContax } from "../../App";

function Home() {
    const navigate = useNavigate()
    //const currentUser = JSON.parse(localStorage.getItem("currentUser"))[0];
    const {user, setUser} = useContext(appContax);
    // useEffect(() => {
    //     fetch(`http://localhost:3000/users/${user.id}`)
    //         .then((res) => res.json())
    //         .then((data) => { setData(data); console.log(data) });
    // }, []);
//לחפש בסקימבה איך לקחת את התז נראה לי useSerchParam

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

            <Link to={"todos"} state={user}><div>Todos</div></Link>
            <Link to={"posts"} state={user}><div>Posts</div></Link>
            <Link to={"albums"} state={user}><div>Albums</div></Link>
            <Link to={"info"} state={user}><div>Info</div></Link>

            <Outlet />
        </>
    );
}

export default Home;
//null, null, '/'