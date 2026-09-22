const express = require('express')
const app = express()
const {createTodo} = require("./types")
const { updateTodo }= require("./types")
const { todo } = require('./db')
const cors = require('cors')

app.use(cors({}))

app.use(express.json())

app.post('/todos',async(req,res)=>{
    const createPayload = req.body
    const parsePayload = createTodo.safeParse(createPayload)
    if(!parsePayload.success){
        res.status(411).json({
            msg: "Not a valid Input"
        })
        return
    }
    await todo.create({
        title : createPayload.title,
        description : createPayload.description,
        completed : false
    })
    res.json({
        msg: "todo is created"
    })
})

app.get('/todos', async(req,res)=>{
    const todos = await todo.find({})
    res.json({
        todos
    })
})

app.put('/completed', async (req,res)=>{
    const updatePayload = req.body
    const parsePayload = updateTodo.safeParse(updatePayload)
    if(!parsePayload.success){
        res.status(411).json({
            msg: "Not a valid Input"
        })
        return
    }
    await todo.update({
        _id : req.body.id
    },{
        completed: true
    })
    res.json({
        msg: "todo marked is completed"
    })
})


app.listen(3000)