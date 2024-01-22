import React from "react";
import { useState, useEffect, useContext } from "react";
import { appContax } from "../../App";
import Select from "react-select"
import Comments from "../comments/comments";

function Posts() {
    const { user, setUser } = useContext(appContax);
    const [data, setData] = useState(null);
    const [nextId, setNextId] = useState("");
    const [searchDb, setSearchDb] = useState(null);
    const [moreInfo, setMoreInfo] = useState([])
    const [stateComments, setStateComments] = useState([])
    const [search, setSearch] = useState({
        name: "",
        value: "",
        btnClick: false
    })

    const searchOptions = [
        { value: "id", label: "id" },
        { value: "title", label: "title" },
    ];

    useEffect(() => {
        user &&
            fetch(`http://localhost:3000/post?userId=${user.id}`)
                .then((res) => res.json())
                .then((data) => { setData(data); });
    }, [user]);

    useEffect(() => {
        fetch(`http://localhost:3000/nextId/1`)
            .then((res) => res.json())
            .then((dt) => {
                setNextId(dt.post)
            })
    }, []);

    const NextId = () => {
        fetch('http://localhost:3000/nextId/1', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ post: `${parseInt(nextId) + 1}` })
        }).then(response => response.json()).then(dt => { setNextId(dt.post) });
    }

    const searchData = () => {
        setSearch((prevProps) => ({
            ...prevProps,
            btnClick: true
        }))
        switch (search.name) {
            case "id": {
                const dataToSearch = data.filter((post) => post.id == search.value)
                setSearchDb(dataToSearch)
                break;
            }
            case "title": {
                const dataToSearch = data.filter((post) => post.title.includes(search.value))
                setSearchDb(dataToSearch)
                break;
            }
        }
    }

    const deletePost = (event) => {
        const id = event.target.className;
        fetch(`http://localhost:3000/post/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(() => {
                setData(values => {
                    return values.filter(item => item.id !== id)
                })
                alert(`The post with the ID=${id} was successfully deleted`);
            })
    }

    const updatePost = (event) => {
        const newTitle = prompt("The new post title:");
        if (newTitle) {
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTitle })
            };
            fetch(`http://localhost:3000/post/${event.target.className}`, requestOptions)
                .then(response => response.json())
                .then((dt) => {
                    const newData = [...data];
                    const index = data.findIndex(todo => todo.id === event.target.className)
                    newData[index] = dt;
                    setData(newData);
                });
        }
    }

    const addPost = () => {
        const newTitle = prompt("The new post title:");
        const newBody = prompt("The new post body:");
        if (newTitle && newBody) {
            const post = {
                userId: `${user.id}`,
                id: `${nextId}`,
                title: `${newTitle}`,
                body: `${newBody}`
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post)
            };
            fetch('http://localhost:3000/post', requestOptions)
                .then(response => response.json())
                .then((dt) => {
                    setData([...data, dt])
                });
            NextId();
        }
    }

    const showMoreLess = (id, setName) => {
        switch (setName) {
            case "comments": {
                stateComments.includes(id.toString())
                    ? setStateComments(stateComments.filter(comm => comm != id))
                    : setStateComments([...stateComments, id])
            }
                break;
            case "post": {
                moreInfo.includes(id.toString())
                    ? setMoreInfo(moreInfo.filter(post => post != id))
                    : setMoreInfo([...moreInfo, id])
                break;
            }
        }
    }

    const db = search.btnClick ? searchDb : data;
    return (
        <>
            <h1>Posts</h1>
            <div>
                <button onClick={addPost}>add</button>
                <Select options={searchOptions} onChange={(event) => setSearch((prevProps) => ({ ...prevProps, name: event.value }))} />
                <input type="text" onChange={(event) => setSearch((prevProps) => ({ ...prevProps, value: event.target.value }))} />
                <button onClick={searchData}>search</button>
                <button onClick={() => setSearch((prevProps) => ({ ...prevProps, btnClick: false }))}>clear search</button>
            </div>
            {db &&
                db.map((item) => {

                    return <table key={item.id}>
                        <tbody>
                            <tr>
                                <td >
                                    <div style={{ border: "1px solid black" }}>{item.id}. {moreInfo.includes(item.id.toString()) ? <><b>{item.title}</b><br />{item.body}</> : <>{item.title}</>} </div>
                                    {stateComments && stateComments.includes(item.id.toString()) && <Comments id={item.id} />}
                                </td>
                                <td>
                                    <button onClick={() => showMoreLess(item.id, "comments")}>comments</button>
                                </td>
                                <td>
                                    <button className={item.id} onClick={deletePost} >delete </button>
                                </td>
                                <td>
                                    <button className={item.id} onClick={updatePost}>update</button>
                                </td>
                                <td>
                                    <button className={item.id} onClick={() => showMoreLess(item.id, "post")} >
                                        {moreInfo.includes(item.id.toString()) ? "-" : "+"}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                })
            }
        </>
    )
}

export default Posts;

