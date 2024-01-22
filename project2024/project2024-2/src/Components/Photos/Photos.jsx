import React from "react";
import { useState, useEffect, useRef } from "react";
import { Form, Link, useLocation } from "react-router-dom";
import { useParallax } from "react-scroll-parallax"
import edit from "../img/edit.png"
import garbage from "../img/garbage.png"

function Photos(props) {

    const [data, setData] = useState(null);
    const [scroll, setScroll] = useState(
        {
            start: 0,
            end: 10
        }
    )

    useEffect(() => {

        fetch(`http://localhost:3000/photos/?albumId=${props.id}&&_start=${scroll.start}&&_end=${scroll.end}`)
            .then((res) => res.json())
            .then((data) => { setData(data);});
    }, []);
    useEffect(() => {

        fetch(`http://localhost:3000/photos/?albumId=${props.id}&&_start=${scroll.start}&&_end=${scroll.end}`)
            .then((res) => res.json())
            .then((data) => { setData(data); });
    }, [scroll]);
    const updatePhoto = (event) => {
        const index = data.findIndex(photo => photo.id === event.target.className)
        const newTitle = prompt("The new newTitle name:");
        const newPhoto = prompt("The new photo name:");
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
    }
    const displayMorePhotos = () => {
        setScroll((prevProps) => ({
            ...prevProps,
            end: scroll.end + 10
        }))
    }
    return (
        <>
            <br />

            {data && data.length > 0 ? <h4>photos:</h4> : <h4>no photos</h4>}
            {data && data.map((item, i) => {
                return <div key={i} >
                    {item.title}
                    <br />
                    <img width={"150px"} height={"150px"} src={item.thumbnailUrl} />
                    <button className={item.id} onClick={updatePhoto} >
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