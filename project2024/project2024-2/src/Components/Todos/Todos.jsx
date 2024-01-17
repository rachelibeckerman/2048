import React, { useState, useEffect } from "react";
import { Form, useLocation } from "react-router-dom";
import Select from "react-select"
import "./Todos.css"
function Todos() {

    const [data, setData] = useState(null);
    const [nextId, setNextId] = useState("");
    const [search, setSearch] = useState({
        name: "",
        value: ""
    })
    const user = useLocation().state;
    console.log(data);

    useEffect(() => {
        fetch(`http://localhost:3000/todos?userId=${user.id}`)
            .then((res) => res.json())
            .then((data) => { setData(data); console.log(data) });
    }, []);

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

    const sortOptions = [
        { value: "serial", label: "serial" },
        { value: "status", label: "status" },
        { value: "alphabetically", label: "alphabetically" },
        { value: "random", label: "random" }
    ]

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

    const updateTodo = (event) => {
        const res = prompt("The new todos title:");
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

    const addTodo = () => {
        const newTitle = prompt("The new todos:");
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

    const searchOptions = [
        { value: "id", label: "id" },
        { value: "title", label: "title" },
        { value: "completed", label: "completed" },
    ];

    // const searchTodo = () => {
    //     console.log("search")
    //     console.log(search)
    // }

    return (
        <>

            <h1>Todos</h1>

            <Select options={sortOptions} onChange={sortData} />
            {/* <Select style={{ width: "400px" }} options={searchOptions} onChange={(event) => setSearch([...search, {name: event.value} ])} />
            <input type="text" className="searchTxt" onChange={(event) => setSearch([...search, { value: event.target.value }])} />
            <button onClick={searchTodo}>search</button> */}
            <br />
            <button onClick={addTodo}>add</button>
            {data &&
                data.map((item) => {
                    console.log(item.completed)
                    return <table key={item.id}>
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

                    </table>
                })}
        </>
    );

}
export default Todos;
