const formAdd = document.querySelector("#form-add")
const inputTitle = document.querySelector("#input-title")
const inputPrice = document.querySelector("#input-price")
const deportesList = document.querySelector("#deportes-list")
const formUpdateDeportes = document.querySelector("#form-update")
const inputUpdateName = document.querySelector("#input-update-name")
const inputUpdatePrice = document.querySelector("#input-update-price")
let idUpdate;

const showAlert = (message, type) => {
    const alertContainer = document.querySelector("#alert-container");
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute("role", "alert");
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    alertContainer.appendChild(alertDiv);
};


formAdd.addEventListener('submit', async (event) => {
    event.preventDefault()
    const title = inputTitle.value
    const price = inputPrice.value

    if (!title.trim() || !price.trim() || isNaN(parseFloat(price))) {
        showAlert("Por favor, ingrese un nombre y un precio válido.", "danger");
        return;
    }

    const res = await fetch(`/deportes/create?title=${title}&price=${price}`)
    const data = await res.json()
    if (res.status === 200) {
        showAlert("Deporte agregado exitosamente.", "success");
    } else {
        showAlert("Error al agregar el deporte. Inténtelo de nuevo.", "danger");
    }
    getDeportes()
})

const getDeportes = async () => {
    const res = await fetch('/deportes')
    const data = await res.json()

    deportesList.innerHTML = ''
    data.forEach(item => {
        deportesList.innerHTML += `
        <tr>
          <th scope="row">${item.id}</th>
          <td>${item.title}</td>
          <td>${item.price}</td>
          <td>
          <button class="btn btn-danger" onclick="deleteDeporte('${item.id}')">Eliminar</button>
        </li>
        <button class="btn btn-warning" onclick="formUpdate('${item.id}', '${item.title}', '${item.price}')">Actualizar</button>
        </tr>
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

    if (!title.trim() || !price.trim() || isNaN(parseFloat(price))) {
        showAlert("Por favor, ingrese un nombre y un precio válido.", "danger");
        return;
    }

    const res = await fetch(`/deportes/update/${idUpdate}?title=${title}&price=${price}`)
    const data = await res.json()
    if (res.status === 200) {
        showAlert("Deporte actualizado exitosamente.", "success");
    } else {
        showAlert("Error al actualizar el deporte. Inténtelo de nuevo.", "danger");
    }

    getDeportes()
})


