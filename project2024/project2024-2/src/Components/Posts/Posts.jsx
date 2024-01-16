import React from "react";
import { useState } from "react";
function Posts() {
    const [img, setImg] = useState(-1)
    const [idEdit, setIdEdit] = useState(null);

    let data = [
        {
            id: 1,
            name: 'test 1'
        },
        {
            id: 2,
            name: 'test 2'
        }
    ]

    return (
        <>
            <h1>posts</h1>
            {data.map((e, idx) => {
                return (
                    img == idx ?
                        (<input placeholder={e.name} style={{ display: idEdit == e.id ? 'block' : 'none' }} />) //<== Conditionaly to appear or not
                        : (
                            <div>
            <p>{e.name}</p>
            <button onClick={() => {
               setImg(true)
               setIdEdit(e.id) //<== set idEdit state here
              } 
             }>edit</button>
          </div>
                        )
                )
            })}
        </>
    )
}
export default Posts;

