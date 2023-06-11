//let rememberedTypeID = ""; // Variable to store the remembered type ID
//
//function searchSongType() {
//  const search = document.getElementById('searched').value;
//  const songTypeTable = document.getElementById('song-type-table');
//
//  if (search === '*') {
//    // Fetch all song types from the API
//    fetch('http://127.0.0.1:5000/song-type?type_id=*')
//      .then(response => response.json())
//      .then(data => {
//        songTypeTable.style.display = 'block';
//        const songTypeList = document.getElementById('song-type-list');
//        songTypeList.innerHTML = ''; // Clear all data table before adding new data
//        data.forEach(type => {
//          const tr = document.createElement('tr');
//          tr.innerHTML = `
//            <td style="text-align:center;">${type.type_id}</td>
//            <td style="text-align:center;">${type.type_name}</td>
//            <td style="text-align:center;">${type.type_description}</td>
//            <td style="text-align:center;"><button onclick="showEditForm('${type.type_id}')">Edit</button><button onclick="deleteSongType('${type.type_id}')">Delete</button></td>
//          `;
//          songTypeList.appendChild(tr);
//        });
//      })
//      .catch(error => {
//        songTypeTable.style.display = 'none';
//        console.log('Failed to fetch song types:', error);
//      });
//  } else {
//    // Fetch song type by ID from the API
//    fetch(`http://127.0.0.1:5000/song-type?type_id=${search}`)
//      .then(response => response.json())
//      .then(type => {
//        songTypeTable.style.display = 'block';
//        const songTypeList = document.getElementById('song-type-list');
//        songTypeList.innerHTML = ''; // Clear all data table before adding new data
//
//        const tr = document.createElement('tr');
//        tr.innerHTML = `
//          <td style="text-align:center;">${type.type_id}</td>
//          <td style="text-align:center;">${type.type_name}</td>
//          <td style="text-align:center;">${type.type_description}</td>
//          <td style="text-align:center;"><button onclick="showEditForm('${type.type_id}')">Edit</button><button onclick="deleteSongType('${type.type_id}')">Delete</button></td>
//        `;
//        songTypeList.appendChild(tr);
//      })
//      .catch(error => {
//        songTypeTable.style.display = 'none';
//        console.log('Song type not found:', error);
//      });
//  }
//}
//
//function showAddForm() {
//  const addForm = document.getElementById('form-to-add-song-type');
//  addForm.style.display = 'block';
//}
//
//function showEditForm(typeID) {
//  const editFormContainer = document.getElementById('edit-form-container');
//  const formToPut = document.getElementById('form_to_put_song_type');
//  formToPut.style.display = 'block';
//
//  const typeIDInput = document.getElementById('type_id_put');
//  const typeNameInput = document.getElementById('type_name_put');
//  const typeDescriptionInput = document.getElementById('type_description_put');
//
//  // Set the type ID in the edit form
//  formToPut.setAttribute('data-type-id', typeID);
//
//  // Fetch song type data by ID from the API
//  fetch(`http://127.0.0.1:5000/song-type?type_id=${typeID}`)
//    .then(response => response.json())
//    .then(type => {
//      typeNameInput.value = type.type_name;
//      typeDescriptionInput.value = type.type_description;
//      editFormContainer.style.display = 'block';
//    })
//    .catch(error => {
//      console.log('Failed to fetch song type:', error);
//    });
//
//  // Store the typeID in the rememberedTypeID variable
//  rememberedTypeID = type_id;
//}
//
//function deleteSongType(type_id) {
//  // Send a DELETE request to the API with the type ID value
//  fetch(`http://127.0.0.1:5000/song-type/${type_id}`, {
//    method: 'DELETE',
//    headers: {
//      'Content-Type': 'application/json'
//    }
//  })
//    .then(response => {
//      // If the request is successful, remove the corresponding table row
//      const row = document.querySelector(`#song-type-list tr[data-type_id="${type_id}"]`);
//      row.parentNode.removeChild(row);
//      const successMessage = document.getElementById('delete-success-message');
//      successMessage.style.display = 'block';
//    })
//    .catch(error => console.error('Failed to delete song type:', error));
//}
//
//// Add an event listener to the song type list table
//const songTypeList = document.getElementById('song-type-list');
//songTypeList.addEventListener('click', (event) => {
//  const target = event.target;
//  // Check if the clicked element is a delete button
//  if (target.tagName === 'BUTTON' && target.textContent === 'Delete') {
//    const type_id = target.getAttribute('data-type_id');
//    deleteSongType(type_id);
//    const successMessage = document.getElementById('delete-success-message');
//    successMessage.style.display = 'block';
//    const songTypeTable = document.getElementById('song-type-table');
//    songTypeTable.style.display = 'none';
//    setTimeout(() => {
//      successMessage.style.display = 'none';
//      searchSongType();
//    }, 1000);
//  }
//});
//
//function handleAddFormSubmit(event) {
//  event.preventDefault();
//
//  const type_id = document.getElementById('type_id').value;
//  const type_name = document.getElementById('type_name').value;
//  const type_description = document.getElementById('type_description').value;
//
//  const typeData = {
//    type_id: type_id,
//    type_name: type_name,
//    type_description: type_description
//  };
//
//  fetch('http://127.0.0.1:5000/song-type?type_id=*', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(typeData)
//  })
//    .then(response => response.json())
//    .then(data => {
//      const songTypeTable = document.getElementById('song-type-table');
//      const postSuccessMessage = document.getElementById('success-message');
//      postSuccessMessage.style.display = 'block';
//      songTypeTable.style.display = 'none';
//      form.reset();
//      console.log('Data posted successfully:', data);
//      setTimeout(() => {
//        postSuccessMessage.style.display = 'none';
//        searchSongType();
//      }, 1000);
//    })
//    .catch(error => {
//      console.error('Error posting data:', error);
//      const postFormContainer = document.getElementById('form-to-add-song-type');
//      // Display the error message to the user
//      const errorMessage = document.getElementById('error-message');
//      errorMessage.textContent = 'Failed to POST: Please check if the Type ID already exists.' + ' (The main error: ' + error.message + ')';
//      errorMessage.style.display = 'block';
//      postFormContainer.style.display = 'none';
//      const songTypeTable = document.getElementById('song-type-table');
//      songTypeTable.style.display = 'none';
//      setTimeout(() => {
//        postFormContainer.style.display = 'block';
//        errorMessage.style.display = 'none';
//        searchSongType();
//      }, 2000);
//    });
//}
//
//function handlePutFormSubmit(event) {
//  event.preventDefault();
//
//  const form = document.getElementById('form_to_put_song_type');
//  const type_id = form.getAttribute('data-type-id');
//  const type_name = document.getElementById('type_name_put').value;
//  const type_description = document.getElementById('type_description_put').value;
//
//  const typeData = {
//    type_id: type_id,
//    type_name: type_name,
//    type_description: type_description
//  };
//
//  fetch('http://127.0.0.1:5000/song-type', {
//    method: 'PUT',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(typeData)
//  })
//    .then(response => response.json())
//    .then(data => {
//      const editFormContainer = document.getElementById('edit-form-container');
//      const songTypeTable = document.getElementById('song-type-table');
//      const putSuccessMessage = document.getElementById('put-success-message');
//      putSuccessMessage.style.display = 'block';
//      songTypeTable.style.display = 'none';
//      editFormContainer.style.display = 'none';
//      form.reset();
//      console.log('Data updated successfully:', data);
//      setTimeout(() => {
//        editFormContainer.style.display = 'none';
//        putSuccessMessage.style.display = 'none';
//        searchSongType();
//      }, 1000);
//    })
//    .catch(error => console.error('Error updating data:', error));
//}
//
//// Attach event listeners
//document.getElementById('show-form-to-add-song-type').addEventListener('click', showAddForm);
//document.getElementById('form-to-add-song-type').addEventListener('submit', handleAddFormSubmit);
//document.getElementById('form_to_put_song_type').addEventListener('submit', handlePutFormSubmit);
