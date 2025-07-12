document.addEventListener('DOMContentLoaded', async () => {
  document.querySelector('body').style.display = 'none';
  document.querySelector('body').style.opacity = 0;

  await checkAuth();
  console.log('userRole controller has been loaded');
  fadeInElement(document.querySelector('body'), 1000);
});

const objForm = new Form('userRoleForm', 'edit-input');
const objModal = new bootstrap.Modal(document.getElementById('appModal'));
const objTableBody = document.getElementById('app-table-body');
const myForm = objForm.getForm();
const appTable = "#app-table";

let insertUpdate = true;
let keyId;
let documentData = "";
let httpMethod = "";
let endpointUrl = "";

myForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!objForm.validateForm()) {
    console.log("Error al validar el formulario");
    return;
  }
  toggleLoading(true);
  documentData = objForm.getDataForm();

  if (insertUpdate) {
    httpMethod = METHODS[1]; // POST
    endpointUrl = URL_USER_ROLE;
  } else {
    httpMethod = METHODS[2]; // PUT
    endpointUrl = URL_USER_ROLE + keyId;
  }

  const resultServices = getDataServices(documentData, httpMethod, endpointUrl);
  resultServices.then(res => res.json())
    .then(data => {
      console.log("Respuesta:", data);
    })
    .catch(error => console.log("Error:", error))
    .finally(() => {
      loadView();
      showHiddenModal(false);
    });
});

function add() {
  insertUpdate = true;
  objForm.resetForm();
  objForm.enabledForm();
  objForm.enabledButton();
  objForm.showButton();
  showHiddenModal(true);
}

function showId(id) {
  objForm.resetForm();
  objForm.disabledForm();
  objForm.disabledButton();
  objForm.hiddenButton();
  getDataId(id);
}

function edit(id) {
  insertUpdate = false;
  keyId = id;
  objForm.resetForm();
  objForm.enabledEditForm();
  objForm.enabledButton();
  objForm.showButton();
  getDataId(id);
}

function delete_(id) {
  if (!confirm("¿Está seguro de eliminar este registro?")) return;
  httpMethod = METHODS[3]; // DELETE
  endpointUrl = URL_USER_ROLE + id;
  toggleLoading(true);
  getDataServices("", httpMethod, endpointUrl)
    .then(res => res.json())
    .then(data => {
      console.log("Eliminado:", data);
    })
    .catch(error => console.log("Error:", error))
    .finally(() => {
      loadView();
    });
}

function getDataId(id) {
  httpMethod = METHODS[0]; // GET
  endpointUrl = URL_USER_ROLE + id;
  getDataServices("", httpMethod, endpointUrl)
    .then(res => res.json())
    .then(data => {
      const getData = data["data"];
      objForm.setDataFormJson(getData);
    })
    .catch(error => console.log("Error:", error))
    .finally(() => {
      showHiddenModal(true);
    });
}

function getData() {
  toggleLoading(true);
  httpMethod = METHODS[0]; // GET
  endpointUrl = URL_USER_ROLE;
  getDataServices("", httpMethod, endpointUrl)
    .then(res => res.json())
    .then(data => {
      console.log("Datos obtenidos:", data);
      createTable(data);
    })
    .catch(error => console.log("Error:", error))
    .finally(() => {
      new DataTable(appTable);
      toggleLoading(false);
    });
}

function createTable(data) {
  objTableBody.innerHTML = "";
  let getData = data['data'];

  // Asegurar que sea un array
  if (!Array.isArray(getData)) {
    getData = [getData];
  }

  if (!getData.length || getData[0] === 0) return;

  getData.forEach(row => {
    let dataRow = `<tr>
      <td>${row.id}</td>
      <td>${row.user_id}</td>
      <td>${row.role_id}</td>
      <td>${row.status_id}</td>
      <td>
        <button type="button" class="btn btn-success" onclick="showId(${row.id})" title="Ver"><i class="fas fa-eye"></i></button>
        <button type="button" class="btn btn-primary" onclick="edit(${row.id})" title="Editar"><i class="fas fa-edit"></i></button>
        <button type="button" class="btn btn-danger" onclick="delete_(${row.id})" title="Eliminar"><i class="fas fa-trash"></i></button>
      </td>
    </tr>`;
    objTableBody.innerHTML += dataRow;
  });
}

function showHiddenModal(show) {
  if (show) {
    objModal.show();
  } else {
    objModal.hide();
  }
}

function loadView() {
  getData();
}

window.addEventListener('load', () => {
  loadView();
});
