const formAdd = document.querySelector("#form-add")
const inputTitle = document.querySelector("#input-title")
const inputPrice = document.querySelector("#input-price")
const deportesList = document.querySelector("#deportes-list")
const formUpdateDeportes = document.querySelector("#form-update")
const inputUpdateName = document.querySelector("#input-update-name")
const inputUpdatePrice = document.querySelector("#input-update-price")
let idUpdate;


formAdd.addEventListener('submit', async (event) => {
    event.preventDefault()
    const title = inputTitle.value
    const price = inputPrice.value
    // validar

    const res = await fetch(`/deportes/create?title=${title}&price=${price}`)
    const data = await res.json()
    console.log(data) //mostrar al usuario que se agrego con exito
    getDeportes()
})

const getDeportes = async () => {
    const res = await fetch('/deportes')
    const data = await res.json()

    deportesList.innerHTML = ''
    data.forEach(item => {
        deportesList.innerHTML += `
        <li>
        ${item.id} - ${item.title} - ${item.price}
        <button onclick="deleteDeporte('${item.id}')">Eliminar</button>
        </li>
        <button onclick="formUpdate('${item.id}', '${item.title}', '${item.price}')">Actualizar</button>
        `
    })
}
getDeportes()

const deleteDeporte = async (id) => {
    const res = await fetch(`/deportes/delete/${id}`)
    const data = await res.json()
    console.log(data)
    getDeportes()
}

const formUpdate = (id, title, price) => {
    inputUpdateName.value = title
    inputUpdatePrice.value = price
    idUpdate = id
}

formUpdateDeportes.addEventListener('submit', async (event) => {
    event.preventDefault()
    const title = inputUpdateName.value
    const price = inputUpdatePrice.value
    const res = await fetch(`/deportes/update/${idUpdate}?title=${title}&price=${price}`)
    const data = await res.json()
    console.log(data)
    getDeportes()
})


