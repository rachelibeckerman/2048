import React from "react";
import { useState,useEffect } from "react";
import { Form, Link, useLocation } from "react-router-dom";
import Select from "react-select"
function Posts() {
    const user = useLocation().state;
    const [data, setData] = useState(null);
    const [nextId, setNextId] = useState("");
    const [searchDb, setSearchDb] = useState(null)
    const [search, setSearch] = useState({
        name: "",
        value: "",
        btnClick: false
    })

    const searchOptions = [
        { value: "id", label: "id" },
        { value: "title", label: "title" },
    ];

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
                const dataToSearch = data.filter((post) => post.title == search.value)
                setSearchDb(dataToSearch)
                break;
            }
        }
    }

    useEffect(() => {
        fetch(`http://localhost:3000/post?userId=${user.id}`)
            .then((res) => res.json())
            .then((data) => { setData(data); console.log(data) });
    }, []);

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
        console.log("console.log")
        console.log(nextId)
       
        if (newTitle) {
            const post = {
                userId: `${user.id}`,
                id: `${nextId}`,
                title: `${newTitle}`,
                body:`${newBody}`
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

    const db = search.btnClick ? searchDb : data
    return (
        <>
        <h1>Posts</h1>
         <button onClick={addPost}>add</button>
        <div>
                <Select options={searchOptions} onChange={(event) => setSearch((prevProps) => ({ ...prevProps, name: event.value }))} />
                <input type="text" onChange={(event) => setSearch((prevProps) => ({ ...prevProps, value: event.target.value }))} />
                <button onClick={searchData}>search</button>
                <button onClick={() => setSearch((prevProps) => ({ ...prevProps, btnClick: false }))}>clear search</button>
            </div>
                {db  &&
                db.map((item) => {
                    console.log(item.completed)
                    return <table key={item.id}>
                        <tr>
                            <td>
                                <label>{item.id}: {item.title}</label>
                            </td>
                            <td>
                                <button className={item.id} onClick={deletePost} >delete </button>
                            </td>
                            <td>
                                <button className={item.id} onClick={updatePost}>update</button>
                            </td>
                           
                        </tr>
                    </table>
                }) 
            }
        </>
    );
}

export default Posts;

   // const [img, setImg] = useState(-1)
    // const [idEdit, setIdEdit] = useState(null);

    // let data = [
    //     {
    //         id: 1,
    //         name: 'test 1'
    //     },
    //     {
    //         id: 2,
    //         name: 'test 2'
    //     }
    // ]

    // return (
    //     <>
    //         <h1>posts</h1>
    //         {data.map((e, idx) => {
    //             return (
    //                 img == idx ?
    //                     (<input placeholder={e.name} style={{ display: idEdit == e.id ? 'block' : 'none' }} />) //<== Conditionaly to appear or not
    //                     : (
    //                         <div>
    //         <p>{e.name}</p>
    //         <button onClick={() => {
    //            setImg(true)
    //            setIdEdit(e.id) //<== set idEdit state here
    //           } 
    //          }>edit</button>
    //       </div>
    //                     )
    //             )
    //         })}
    //     </>
    // )