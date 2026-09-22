import { useState } from "react"

export function CreateTodo(){
    const [title , setTitle]= useState("")
    const [description , setDescription] = useState("")

    return <div>
        <input style={{
            padding:10,
            margin : 10
        }} type="text" placeholder="title" onChange={(e)=>{
            const value = e.target.value
            setTitle(e.target.value)
        }}/> <br />
        <input style={{
            padding:10,
            margin : 10
        }} type="text" placeholder="description" onChange={(e)=>{
            const value = e.target.value
            setDescription(e.target.value)
        }}/><br />

        <button style={{
            padding:10,
            margin : 10
        }} onClick={()=>{
            fetch("http://localhost:3000/todos",{
                method: "POST",
                body: JSON.stringify({
                    title : title,
                    description : description
                }),
                headers:{
                    "content-type" : "application/json"
                }
            })
            .then(async(res)=>{
                const json = await res.json()
                alert("Todo Added")
            })
        }}>Add Todo</button>
    </div>
}