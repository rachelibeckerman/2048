import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Select from "react-select"
import Photos from "../Photos/Photos";
import { appContax } from "../../App";
import './Albums.css'

function Albums() {

    const [data, setData] = useState(null);
    const [searchDb, setSearchDb] = useState(null);
    const [nextId, setNextId] = useState("");
    const [statePhotos, setStatePhotos] = useState([]);
    const { user, setUser } = useContext(appContax);
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
            fetch(`http://localhost:3000/albums?userId=${user.id}`)
                .then((res) => res.json())
                .then((data) => { setData(data); });
    }, [user]);

    useEffect(() => {
        fetch(`http://localhost:3000/nextId/1`)
            .then((res) => res.json())
            .then((dt) => {
                setNextId(dt.albums)
            })
    }, []);

    const NextId = () => {
        fetch('http://localhost:3000/nextId/1', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ albums: `${parseInt(nextId) + 1}` })
        }).then(response => response.json()).then(dt => { setNextId(dt.albums) });
    };

    const searchData = () => {
        setSearch((prevProps) => ({
            ...prevProps,
            btnClick: true
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
        }
    };

    const addAlbums = () => {
        const newTitle = prompt("The new albums title:");
        if (newTitle) {
            const album = {
                userId: `${user.id}`,
                id: `${nextId}`,
                title: `${newTitle}`
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(album)
            };
            fetch('http://localhost:3000/albums', requestOptions)
                .then(response => response.json())
                .then((dt) => {
                    setData([...data, dt])
                });
            NextId();
        }
    }

   
    const showMoreLess = (id) => {
        statePhotos.includes(id.toString())
            ? setStatePhotos(statePhotos.filter(comm => comm != id))
            : setStatePhotos([...statePhotos, id])
    };

    const db = search.btnClick ? searchDb : data
    return (
        <>
            <h1>Albums</h1>
            <div className="opsitons">
            <div className="SelectSearch">
                <Select className="select" placeholder={"search by:"} options={searchOptions} onChange={(event) => setSearch((prevProps) => ({ ...prevProps, name: event.value }))} />
                <input placeholder="search" type="text" onChange={(event) => setSearch((prevProps) => ({ ...prevProps, value: event.target.value }))} />
                <button onClick={searchData}>search</button>
                <button onClick={() => setSearch((prevProps) => ({ ...prevProps, btnClick: false }))}>clear search</button>
                <button onClick={addAlbums}>add</button>
            </div>
            </div>
            {db &&
                db.map((item) => {
                    return <table key={item.id}>
                        <tbody>
                            <tr>
                                <td>
                                    <Link className="linkAlbums" onClick={() => showMoreLess(item.id)} >{item.id}:  {item.title}</Link>
                                    {statePhotos && statePhotos.includes(item.id.toString()) && <Photos id={item.id} />}
                                

                                </td>
                            </tr>
                        </tbody>
                    </table>
                })
            }
        </>
    );
};
export default Albums;