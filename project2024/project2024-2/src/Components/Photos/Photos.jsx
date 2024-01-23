import React from "react";
import { useState, useEffect, useContext } from "react";
import { Form, Link, useLocation } from "react-router-dom";
import { appContax } from "../../App";
import addphoto from "../img/addphoto.png"
import edit from "../img/edit.png"
import garbage from "../img/garbage.png"

function Photos(props) {

    const { user, setUser } = useContext(appContax);
    const [data, setData] = useState();
    const [nextId, setNextId] = useState("");
    const [scroll, setScroll] = useState(
        {
            start: 0,
            end: 10
        }
    )

    useEffect(() => {
        user &&
            fetch(`http://localhost:3000/photos/?albumId=${props.id}&&_start=${scroll.start}&&_end=${scroll.end}`)
                .then((res) => res.json())
    }, [user]);

    useEffect(() => {
        fetch(`http://localhost:3000/photos/?albumId=${props.id}&&_start=${scroll.start}&&_end=${scroll.end}`)
            .then((res) => res.json())
            .then((data) => { setData(data); });
    }, [scroll]);

    useEffect(() => {
        fetch(`http://localhost:3000/nextId/1`)
            .then((res) => res.json())
            .then((dt) => {
                setNextId(dt.photos)
            })
    }, []);

    const NextId = () => {
        fetch('http://localhost:3000/nextId/1', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ photos: `${parseInt(nextId) + 1}` })
        }).then(response => response.json()).then(dt => { setNextId(dt.photos) });
    };

    const updatePhoto = (event) => {
        const index = data.findIndex(photo => photo.id === event.target.className)
        const newTitle = prompt("The new photo name:");
        const newPhoto = prompt("The new photo url:");
        if (newTitle || newPhoto) {
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: newTitle ? newTitle : data[index].name,
                    url: newPhoto ? newPhoto : data[index].body,
                    thumbnailUrl: newPhoto ? newPhoto : data[index].body
                })
            };
            fetch(`http://localhost:3000/photos/${event.target.className}`, requestOptions)
                .then(response => response.json())
                .then((dt) => {
                    const newData = [...data];
                    newData[index] = dt;
                    setData(newData);
                });
        }
    }
    const deletePhoto = (event) => {
        fetch(`http://localhost:3000/photos/${event.target.className}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(() => {
                setData(comment => {
                    return comment.filter(item => item.id !== event.target.className)
                })
                alert(`The photo was successfully deleted`);
            })
    };

    const addPhoto = (event) => {
        const newTitle = prompt("The new photo title:");
        const newUrl = prompt("The new photo url:");
        if (newTitle && newUrl) {
            const photo = {
                albumId: `${event.target.className}`,
                id: `${nextId}`,
                title: `${newTitle}`,
                url: `${newUrl}`,
                thumbnailUrl: `${newUrl}`
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(photo)
            };
            fetch('http://localhost:3000/photos', requestOptions)
                .then(response => response.json())
                .then((dt) => {
                    setData([...data, dt])
                });
            NextId();
        }
    };

    const displayMorePhotos = () => {
        setScroll((prevProps) => ({
            ...prevProps,
            end: scroll.end + 10
        }))
    }
    return (
        <>
            {data && <img className={props.id} onClick={addPhoto} src={addphoto} width={"30px"} height={"30px"} />}
            {data && data.length > 0 ? <h4>photos:</h4> : <h4>no photos</h4>}
            {data && data.map((item, i) => {
                return <div key={i} >
                    {item.title}
                    <br />
                    <img width={"150px"} height={"150px"} src={item.thumbnailUrl} />
                    <button className={item.id} onClick={updatePhoto}>
                        <img src={edit} width={"16px"} height={"16px"} />
                    </button>
                    <button className={item.id} onClick={deletePhoto} >
                        <img src={garbage} width={"20px"} height={"19px"} />
                    </button>
                </div>
            })}
            {data && <button onClick={() => displayMorePhotos()}>more</button>}


        </>
    )
} export default Photos