const formAddTodo = document.querySelector("#form-add-todo")
const inputTitle = document.querySelector("#input-title")

formAddTodo.addEventListener('submit', async (event) => {
    event.preventDefault()
    const title = inputTitle.value
    // validar

    const res = await fetch(`/todos/create?title=${title}`)
    const data = await res.json()
    console.log(data)

})

