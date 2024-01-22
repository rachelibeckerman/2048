import React from "react";
import { useState, useEffect, useContext } from "react";
import { Form, Link, useLocation } from "react-router-dom";
import { appContax } from "../../App";
import Select from "react-select"
import edit from "../img/edit.png"
import garbage from "../img/garbage.png"

function Comments() {
    const [data, setData] = useState(null);
    const [nextId, setNextId] = useState("");
    const { user, setUser } = useContext(appContax);

    useEffect(() => {
        user &&
            fetch(`http://localhost:3000/comments?postId=${user.id}`)
                .then((res) => res.json())
                .then((data) => { setData(data); });
    }, [user]);

    useEffect(() => {
        fetch(`http://localhost:3000/nextId/1`)
            .then((res) => res.json())
            .then((dt) => {
                setNextId(dt.comments)
            })
    }, []);

    const NextId = () => {
        fetch('http://localhost:3000/nextId/1', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comments: `${parseInt(nextId) + 1}` })
        }).then(response => response.json()).then(dt => { setNextId(dt.comments) });
    }

    const addComments = () => {
        const newCommentsName = prompt("The new commont name:");
        const newCommentsBody = prompt("The new commont body:");
        if (newCommentsName && newCommentsBody) {
            const comment = {
                id: `${nextId}`,
                postId: `${user.id}`,
                name: `${newCommentsName}`,
                email: `${user.email}`,
                body: `${newCommentsBody}`
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(comment)
            };
            fetch('http://localhost:3000/comments', requestOptions)
                .then(response => response.json())
                .then((dt) => {
                    setData([...data, dt])
                });
            NextId();
        }
    };

    const updateComment = (event) => {
        const index = data.findIndex(comm => comm.id === event.target.className)
        const newCommentsName = prompt("The new commont name:");
        const newCommentsBody = prompt("The new commont body:");
        if (newCommentsName || newCommentsBody) {
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newCommentsName ? newCommentsName : data[index].name,
                    body: newCommentsBody ? newCommentsBody : data[index].body
                })
            };
            fetch(`http://localhost:3000/comments/${event.target.className}`, requestOptions)
                .then(response => response.json())
                .then((dt) => {
                    const newData = [...data];
                    newData[index] = dt;
                    setData(newData);
                });
        }
    };

    const deleteComment = (event) => {
        fetch(`http://localhost:3000/comments/${event.target.className}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(() => {
                setData(comment => {
                    return comment.filter(item => item.id !== event.target.className)
                })
                alert(`The comment ${event.target.className} was successfully deleted`);
            })
    };

    return (
        <>
            <br />
            <h4>comments:</h4>
            {data && data.map((item, i) => {
                return <div key={i}>
                    <li>
                        <b> from:  {item.name} ,  email: {item.email}:</b>
                        <br /> {item.body}
                        {user.email == item.email &&
                            <button className={item.id} onClick={(event) => updateComment(event)} >
                                <img src={edit} width={"16px"} height={"16px"} />
                            </button>}
                        {user.email == item.email &&
                            <button className={item.id} onClick={(event) => deleteComment(event)} >
                                <img src={garbage} width={"20px"} height={"19px"} />
                            </button>}
                    </li>
                </div>
            })}
            <button onClick={addComments}>add</button>
        </>
    )
};
export default Comments