import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


function Todos() {

    const [data, setData] = useState(null);
    const user = useLocation().state[0];
    console.log(user.id)
    useEffect(() => {
        fetch(`http://localhost:3000/todos?userId=${user.id}`)
            .then((res) => res.json())
            .then((data) => { setData(data); console.log(data) });
    }, []);
    const changeTodoStatus = () => {

    }
    return (
        <>
            <h1>Todos</h1>
            {data &&
                data.map((item) => {
                    console.log(item.completed)
                    return <table key={item.id}>
                        <tr>
                            <td>
                                <input type="checkbox" defaultChecked={item.completed} onChange={changeTodoStatus} />
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