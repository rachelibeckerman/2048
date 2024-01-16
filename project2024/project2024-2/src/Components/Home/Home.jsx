import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

function Home() {
    const navigate = useNavigate()
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))[0];

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
            <h2>{currentUser.name}</h2>

            <Link to={"todos"} state={currentUser}><div>Todos</div></Link>
            <Link to={"posts"} state={currentUser}><div>Posts</div></Link>
            <Link to={"albums"} state={currentUser}><div>Albums</div></Link>
            <Link to={"info"} state={currentUser}><div>Info</div></Link>

            <Outlet />
        </>
    );
}

export default Home;
//null, null, '/'