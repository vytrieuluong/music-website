//let rememberedSingerID = ""; // Variable to store the remembered singer ID
//
//function searchSinger() {
//  const search = document.getElementById('searched').value;
//  const singerTable = document.getElementById('singer-table');
//
//  if (search === '*') {
//    // Fetch all singers from the API
//    fetch('http://127.0.0.1:5000/singer?sid=*')
//      .then(response => response.json())
//      .then(data => {
//        singerTable.style.display = 'block';
//        const singerList = document.getElementById('singer-list');
//        singerList.innerHTML = ''; // Clear all data table before adding new data
//        data.forEach(singer => {
//          const tr = document.createElement('tr');
//          tr.innerHTML = `
//            <td style="text-align:center;">${singer.singer_id}</td>
//            <td style="text-align:center;">${singer.singer_name}</td>
//            <td style="text-align:center;">${singer.singer_description}</td>
//            <td style="text-align:center;">${singer.hometown}</td>
//            <td style="text-align:center;">${singer.date_of_birth}</td>
//            <td style="text-align:center;"><button onclick="showEditForm('${singer.singer_id}')">Edit</button><button onclick="deleteSinger('${singer.singer_id}')">Delete</button></td>
//          `;
//          singerList.appendChild(tr);
//        });
//      })
//      .catch(error => {
//        singerTable.style.display = 'none';
//        console.log('Failed to fetch singers:', error);
//      });
//  } else {
//    // Fetch singer by ID from the API
//    fetch(`http://127.0.0.1:5000/singer?sid=${search}`)
//      .then(response => response.json())
//      .then(singer => {
//        singerTable.style.display = 'block';
//        const singerList = document.getElementById('singer-list');
//        singerList.innerHTML = ''; // Clear all data table before adding new data
//
//        const tr = document.createElement('tr');
//        tr.innerHTML = `
//          <td style="text-align:center;">${singer.singer_id}</td>
//          <td style="text-align:center;">${singer.singer_name}</td>
//          <td style="text-align:center;">${singer.singer_description}</td>
//          <td style="text-align:center;">${singer.hometown}</td>
//          <td style="text-align:center;">${singer.date_of_birth}</td>
//          <td style="text-align:center;"><button onclick="showEditForm('${singer.singer_id}')">Edit</button><button onclick="deleteSinger('${singer.singer_id}')">Delete</button></td>
//        `;
//        singerList.appendChild(tr);
//      })
//      .catch(error => {
//        singerTable.style.display = 'none';
//        console.log('Singer not found:', error);
//      });
//  }
//}
//
//function showAddForm() {
//  const addForm = document.getElementById('form-to-add-singer');
//  addForm.style.display = 'block';
//}
//
//function showEditForm(singerID) {
//  const editFormContainer = document.getElementById('edit-form-container');
//  const formToPut = document.getElementById('form_to_put_singer');
//  formToPut.style.display = 'block';
//
//  const singerIDInput = document.getElementById('singer_id_put');
//  const singerNameInput = document.getElementById('singer_name_put');
//  const singerDescriptionInput = document.getElementById('singer_description_put');
//  const hometownInput = document.getElementById('hometown_put');
//  const dateOfBirthInput = document.getElementById('date_of_birth_put');
//
//  // Set the singer ID in the edit form
//  formToPut.setAttribute('data-singer-id', singerID);
//
//  // Fetch singer data by ID from the API
//  fetch(`http://127.0.0.1:5000/singer?sid=${singerID}`)
//    .then(response => response.json())
//    .then(singer => {
//      singerNameInput.value = singer.singer_name;
//      singerDescriptionInput.value = singer.singer_description;
//      hometownInput.value = singer.hometown;
//      dateOfBirthInput.value = singer.date_of_birth;
//      editFormContainer.style.display = 'block';
//    })
//    .catch(error => {
//      console.log('Failed to fetch singer:', error);
//    });
//
//  // Store the singerID in the rememberedSingerID variable
//  rememberedSingerID = singerID;
//}
//
//function deleteSinger(singerID) {
//  // Send a DELETE request to the API with the singer ID value
//  fetch(`http://127.0.0.1:5000/singer/${singerID}`, {
//    method: 'DELETE',
//    headers: {
//      'Content-Type': 'application/json'
//    }
//  })
//    .then(response => {
//      // If the request is successful, remove the corresponding table row
//      const row = document.querySelector(`#singer-list tr[data-singer_id="${singerID}"]`);
//      row.parentNode.removeChild(row);
//      const successMessage = document.getElementById('delete-success-message');
//      successMessage.style.display = 'block';
//    })
//    .catch(error => console.error('Failed to delete singer:', error));
//}
//
//// Add an event listener to the singer list table
//const singerList = document.getElementById('singer-list');
//singerList.addEventListener('click', (event) => {
//  const target = event.target;
//  // Check if the clicked element is a delete button
//  if (target.tagName === 'BUTTON' && target.textContent === 'Delete') {
//    const singerID = target.getAttribute('data-singer_id');
//    deleteSinger(singerID);
//    const successMessage = document.getElementById('delete-success-message');
//    successMessage.style.display = 'block';
//    const singerTable = document.getElementById('singer-table');
//    singerTable.style.display = 'none';
//    setTimeout(() => {
//      successMessage.style.display = 'none';
//      searchSinger();
//    }, 1000);
//  }
//});
//
//function handleAddFormSubmit(event) {
//  event.preventDefault();
//
//  const singerID = document.getElementById('singer_id').value;
//  const singerName = document.getElementById('singer_name').value;
//  const singerDescription = document.getElementById('singer_description').value;
//  const hometown = document.getElementById('hometown').value;
//  const dateOfBirth = document.getElementById('date_of_birth').value;
//
//  const singerData = {
//    singer_id: singerID,
//    singer_name: singerName,
//    singer_description: singerDescription,
//    hometown: hometown,
//    date_of_birth: dateOfBirth
//  };
//
//  fetch('http://127.0.0.1:5000/singer?sid=*', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(singerData)
//  })
//    .then(response => response.json())
//    .then(data => {
//      const singerTable = document.getElementById('singer-table');
//      const postSuccessMessage = document.getElementById('success-message');
//      postSuccessMessage.style.display = 'block';
//      singerTable.style.display = 'none';
//      form.reset();
//      console.log('Data posted successfully:', data);
//      setTimeout(() => {
//        postSuccessMessage.style.display = 'none';
//        searchSinger();
//      }, 1000);
//    })
//    .catch(error => {
//      console.error('Error posting data:', error);
//      const postFormContainer = document.getElementById('form-to-add-singer');
//      // Display the error message to the user
//      const errorMessage = document.getElementById('error-message');
//      errorMessage.textContent = 'Failed to POST: Please check if the Singer ID already exists.' + ' (The main error: ' + error.message + ')';
//      errorMessage.style.display = 'block';
//      postFormContainer.style.display = 'none';
//      const singerTable = document.getElementById('singer-table');
//      singerTable.style.display = 'none';
//      setTimeout(() => {
//        postFormContainer.style.display = 'block';
//        errorMessage.style.display = 'none';
//        searchSinger();
//      }, 2000);
//    });
//}
//
//function handlePutFormSubmit(event) {
//  event.preventDefault();
//
//  const form = document.getElementById('form_to_put_singer');
//  const singerID = form.getAttribute('data-singer-id');
//  const singerName = document.getElementById('singer_name_put').value;
//  const singerDescription = document.getElementById('singer_description_put').value;
//  const hometown = document.getElementById('hometown_put').value;
//  const dateOfBirth = document.getElementById('date_of_birth_put').value;
//
//  const singerData = {
//    singer_id: singerID,
//    singer_name: singerName,
//    singer_description: singerDescription,
//    hometown: hometown,
//    date_of_birth: dateOfBirth
//  };
//
//  fetch('http://127.0.0.1:5000/singer', {
//    method: 'PUT',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(singerData)
//  })
//    .then(response => response.json())
//    .then(data => {
//      const editFormContainer = document.getElementById('edit-form-container');
//      const singerTable = document.getElementById('singer-table');
//      const putSuccessMessage = document.getElementById('put-success-message');
//      putSuccessMessage.style.display = 'block';
//      singerTable.style.display = 'none';
//      editFormContainer.style.display = 'none';
//      form.reset();
//      console.log('Data updated successfully:', data);
//      setTimeout(() => {
//        editFormContainer.style.display = 'none';
//        putSuccessMessage.style.display = 'none';
//        searchSinger();
//      }, 1000);
//    })
//    .catch(error => console.error('Error updating data:', error));
//}
//
//// Attach event listeners
//document.getElementById('show-form-to-add-singer').addEventListener('click', showAddForm);
//document.getElementById('form-to-add-singer').addEventListener('submit', handleAddFormSubmit);
//document.getElementById('form_to_put_singer').addEventListener('submit', handlePutFormSubmit);
