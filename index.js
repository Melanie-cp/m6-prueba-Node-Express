import express from 'express'

const __dirname = import.meta.dirname
import { readFile, writeFile } from 'fs/promises'
import { nanoid } from 'nanoid'

const app = express()

//habilitar el req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const pathFile = __dirname + "/data/todos.json"

// app.get('/', (req, res) => {
//     res.json({ ok: true })
// })

// TO DO CRUD
// READ
app.get('/todos', async (req, res) => {
    try {
        const stringTodos = await readFile(pathFile, 'utf-8')
        const todos = JSON.parse(stringTodos)

        return res.json(todos)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

// CREATE
app.get('/todos/create', async (req, res) => {
    try {
        const title = req.query.title

        const newTodo = {
            title: title,
            completed: false,
            id: nanoid()
        }

        const stringTodos = await readFile(pathFile, 'utf-8')
        const todos = JSON.parse(stringTodos)

        todos.push(newTodo)

        await writeFile(pathFile, JSON.stringify(todos))

        return res.json(todos)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

// DELETE
app.get('/todos/delete/:id', async (req, res) => {
    try {
        const id = req.params.id

        const stringTodos = await readFile(pathFile, 'utf-8')
        const todos = JSON.parse(stringTodos)

        const todo = todos.find(item => item.id === id)
        if (!todo) {
            return res.status(404).json({ ok: false, msg: "id no encontrado" })
        }

        const newTodos = todos.filter((item) => item.id !== id)

        await writeFile(pathFile, JSON.stringify(newTodos))

        return res.json(newTodos)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

//UPDATE
app.get('/todos/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { title = "", completed = false } = req.query


        const stringTodos = await readFile(pathFile, 'utf-8')
        const todos = JSON.parse(stringTodos)

        const todo = todos.find(item => item.id === id)
        if (!todo) {
            return res.status(404).json({ ok: false, msg: "id no encontrado" })
        }

        todo.title = title
        todo.completed = completed

        await writeFile(pathFile, JSON.stringify(todos))
        return res.json(todos)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server andando en http://localhost:${PORT}`))