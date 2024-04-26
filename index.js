import express from 'express'

const __dirname = import.meta.dirname
import { readFile, writeFile } from 'fs/promises'
import { nanoid } from 'nanoid'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))

const pathFile = __dirname + "/data/deportes.json"

// TO DO CRUD
// READ
app.get('/deportes', async (req, res) => {
    try {
        const stringDeportes = await readFile(pathFile, 'utf-8')
        const deportes = JSON.parse(stringDeportes)

        return res.json(deportes)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

// CREATE
app.get('/deportes/create', async (req, res) => {
    try {
        const title = req.query.title
        const price = req.query.price

        const newDeporte = {
            title: title,
            id: nanoid().slice(15),
            price: price
        }

        const stringDeportes = await readFile(pathFile, 'utf-8')
        const deportes = JSON.parse(stringDeportes)

        deportes.push(newDeporte)

        await writeFile(pathFile, JSON.stringify(deportes))

        return res.json(deportes)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

// DELETE
app.get('/deportes/delete/:id', async (req, res) => {
    try {
        const id = req.params.id

        const stringDeportes = await readFile(pathFile, 'utf-8')
        const deportes = JSON.parse(stringDeportes)

        const deporte = deportes.find(item => item.id === id)
        if (!deporte) {
            return res.status(404).json({ ok: false, msg: "id no encontrado" })
        }

        const newDeportes = deportes.filter((item) => item.id !== id)

        await writeFile(pathFile, JSON.stringify(newDeportes))

        return res.json(newDeportes)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

//UPDATE
app.get('/deportes/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { title = "", price = "" } = req.query


        const stringDeportes = await readFile(pathFile, 'utf-8')
        const deportes = JSON.parse(stringDeportes)

        const deporte = deportes.find(item => item.id === id)
        if (!deporte) {
            return res.status(404).json({ ok: false, msg: "id no encontrado" })
        }

        deporte.title = title
        deporte.price = price

        await writeFile(pathFile, JSON.stringify(deportes))
        return res.json(deportes)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server andando en http://localhost:${PORT}`))

