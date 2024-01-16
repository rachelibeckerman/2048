import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select"

function Todos() {

    const [data, setData] = useState(null);
    const user = useLocation().state;

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
            .then((data) => {
                console.log(data);
            });
    }
    const options = [
        { value: "serial", label: "serial" },
        { value: "status", label: "status" },
        { value: "alphabetically", label: "alphabetically" },
        { value: "random", label: "random" }
    ]
    const hh = (event) => {
        console.log(event.value)
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

    return (
        <>

            <h1>Todos</h1>

            <Select options={options} onChange={hh} />
            {data &&
                data.map((item) => {
                    console.log(item.completed)
                    return <table key={item.id}>

                        {/* <th>id:</th>
                            <th>task:</th>
                            <th>status</th> */}

                        <tr>
                            <td>
                                <input type="checkbox" className={item.id} defaultChecked={item.completed} onChange={changeTodoStatus} />
                            </td>
                            <td>
                                <label>{item.id}:  {item.title}</label>
                            </td>
                        </tr>
                    </table>
                })}
        </>
    );

}
export default Todos;
