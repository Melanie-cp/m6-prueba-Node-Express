const formAddTodo = document.querySelector("#form-add-todo")
const inputTitle = document.querySelector("#input-title")
const todoList = document.querySelector("#todo-list")

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



