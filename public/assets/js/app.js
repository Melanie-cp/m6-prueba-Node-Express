const formAddTodo = document.querySelector("#form-add-todo")
const inputTitle = document.querySelector("#input-title")
const todoList = document.querySelector("#todo-list")
const formUpdateTodo = document.querySelector("#form-update-todo")
const inputUpdateTodo = document.querySelector("#input-update-todo")
const inputUpdateCompleted = document.querySelector("#input-update-completed")
let idUpdate;


formAddTodo.addEventListener('submit', async (event) => {
    event.preventDefault()
    const title = inputTitle.value
    // validar

    const res = await fetch(`/todos/create?title=${title}`)
    const data = await res.json()
    console.log(data) //mostrar al usuario que se agrego con exito
    getTodos()
})

const getTodos = async () => {
    const res = await fetch('/todos')
    const data = await res.json()

    todoList.innerHTML = ''
    data.forEach(item => {
        todoList.innerHTML += `
        <li>
        ${item.id} - ${item.title} - ${item.completed}
        <button onclick="deleteTodo('${item.id}')">Eliminar</button>
        </li>
        <button onclick="formUpdate('${item.id}', '${item.title}', '${item.completed}')">Actualizar</button>
        `
    })
}
getTodos()

const deleteTodo = async (id) => {
    const res = await fetch(`/todos/delete/${id}`)
    const data = await res.json()
    console.log(data)
    getTodos()
}

const formUpdate = (id, title, completed) => {
    // console.log(id, title, completed)
    inputUpdateTodo.value = title
    inputUpdateCompleted.value = completed
    idUpdate = id
}

formUpdateTodo.addEventListener('submit', async (event) => {
    event.preventDefault()
    const title = inputUpdateTodo.value
    const completed = inputUpdateCompleted.value
    const res = await fetch(`/todos/update/${idUpdate}?title=${title}&completed=${completed}`)
    const data = await res.json()
    console.log(data)
    getTodos()
})


