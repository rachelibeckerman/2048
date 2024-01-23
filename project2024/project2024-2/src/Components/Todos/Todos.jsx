import React, { useState, useEffect, useContext } from "react";
import { Form, useLocation } from "react-router-dom";
import Select from "react-select"
import "./Todos.css"
import { appContax } from "../../App";
function Todos() {

    const { user, setUser } = useContext(appContax);
    const [data, setData] = useState(null);
    const [nextId, setNextId] = useState("");
    const [searchDb, setSearchDb] = useState(null)
    const [search, setSearch] = useState({
        name: "",
        value: "",
        statusSearch: false
    })

    const searchOptions = [
        { value: "id", label: "id" },
        { value: "title", label: "title" },
        { value: "completed", label: "completed" },
    ];

    const sortOptions = [
        { value: "serial", label: "serial" },
        { value: "status", label: "status" },
        { value: "alphabetically", label: "alphabetically" },
        { value: "random", label: "random" }
    ]

    useEffect(() => {
        user &&
            fetch(`http://localhost:3000/todos?userId=${user.id}`)
                .then((res) => res.json())
                .then((data) => { setData(data); });
    }, [user]);

    useEffect(() => {
        fetch(`http://localhost:3000/nextId/1`)
            .then((res) => res.json())
            .then((dt) => {
                setNextId(dt.todos)
            })
    }, []);

    const NextId = () => {
        fetch('http://localhost:3000/nextId/1', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ todos: `${parseInt(nextId) + 1}` })
        }).then(response => response.json()).then(dt => { setNextId(dt.todos) });
    }

    const changeTodoStatus = (event) => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: event.target.checked ? true : false })
        };
        fetch(`http://localhost:3000/todos/${event.target.className}`, requestOptions)
            .then(response => response.json())
            .then((dt) => {
                const newData = [...data];
                const index = data.findIndex(todo => todo.id === event.target.className)
                newData[index] = dt;
                setData(newData)
            });
    }

    const sortData = (event) => {
        const dataToSort = [...data];
        switch (event.value) {
            case "serial":
                dataToSort.sort((a, b) => Number(a.id) - Number(b.id))
                break;
            case "status":
                dataToSort.sort((a, b) => Number(b.completed) - Number(a.completed))
                break;
            case "alphabetically":
                dataToSort.sort((a, b) => a.title > b.title ? 1 : -1,)
                break;
            case "random":
                setData(dataToSort.sort(() => Math.random() - 0.5))
                break
        }
        setData(dataToSort)
    }

    const searchData = () => {
        setSearch((prevProps) => ({
            ...prevProps,
            statusSearch: true
        }))
        switch (search.name) {
            case "id": {
                const dataToSearch = data.filter((value) => value.id == search.value)
                setSearchDb(dataToSearch)
                break;
            }
            case "title": {
                const dataToSearch = data.filter((value) => value.title.includes(search.value))
                setSearchDb(dataToSearch)
                break;
            }
            case "completed": {
                const dataToSearch = data.filter((value) => `${value.completed}` == search.value)
                setSearchDb(dataToSearch)
                break;
            }
        }
    }

    const deleteTodo = (event) => {
        const id = event.target.className;
        fetch(`http://localhost:3000/todos/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(() => {
                setData(values => {
                    return values.filter(item => item.id !== id)
                })
                alert(`The task with the ID=${id} was successfully deleted`);
            })
    }


    const updateTodo = (event) => {
        const res = prompt("The new todos title:");
        if (res) {
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: res })
            };
            fetch(`http://localhost:3000/todos/${event.target.className}`, requestOptions)
                .then(response => response.json())
                .then((dt) => {
                    const newData = [...data];
                    const index = data.findIndex(todo => todo.id === event.target.className)
                    newData[index] = dt;
                    setData(newData);
                });
        }
    }

    const addTodo = () => {
        const newTitle = prompt("The new todos:");
        if (newTitle) {
            const todos = {
                userId: `${user.id}`,
                id: `${nextId}`,
                title: `${newTitle}`,
                completed: false,
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(todos)
            };
            fetch('http://localhost:3000/todos', requestOptions)
                .then(response => response.json())
                .then((dt) => {
                    setData([...data, dt])
                });
            NextId();
        }
    }

    const db = search.statusSearch ? searchDb : data

    return (
        <>

            <h1>Todos</h1>
            <div className="opsitons">
                <div className="SelectSort"></div>
                <Select className="select" placeholder={"sort by:"} options={sortOptions} onChange={sortData} />
                <div className="SelectSearch">
                    <Select className="select" placeholder={"search by:"} options={searchOptions} onChange={(event) => setSearch((prevProps) => ({ ...prevProps, name: event.value }))} />
                    <input  placeholder="search" type="text" onChange={(event) => setSearch((prevProps) => ({ ...prevProps, value: event.target.value }))} />
                    <button onClick={searchData}>search</button>
                    <button onClick={() => setSearch((prevProps) => ({ ...prevProps, statusSearch: false }))}>clear search</button>
                </div>
                <button  onClick={addTodo}>add</button>
            </div>
            {db &&
                db.map((item) => {
                    return <table key={item.id}>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="checkbox" className={item.id} defaultChecked={item.completed} onChange={changeTodoStatus} />
                                </td>
                                <td>
                                    <label>{item.id}:  {item.title}</label>
                                </td>
                                <td>
                                    <button className={item.id} onClick={deleteTodo} >delete </button>
                                </td>
                                <td>
                                    <button className={item.id} onClick={updateTodo}>update</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                })
            }
        </>
    );

}
export default Todos;
