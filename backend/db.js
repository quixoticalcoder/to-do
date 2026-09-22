const mongoose = require('mongoose')
const { boolean } = require('zod')

mongoose.connect(process.env.MONGODB_URI)

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', todoSchema)

module.exports = {
    todo
}
