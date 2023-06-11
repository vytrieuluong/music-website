//let rememberedAlbumID = ""; // Variable to store the remembered album ID
//
//function searchAlbum() {
//  const search = document.getElementById('searched').value;
//  const albumTable = document.getElementById('album-table');
//
//  if (search === '*') {
//    // Fetch all albums from the API
//    fetch('http://127.0.0.1:5000/album?aid=*')
//      .then(response => response.json())
//      .then(data => {
//        albumTable.style.display = 'block';
//        const albumList = document.getElementById('album-list');
//        albumList.innerHTML = ''; // Clear all data table before adding new data
//        data.forEach(album => {
//          const tr = document.createElement('tr');
//          tr.innerHTML = `
//            <td style="text-align:center;">${album.album_id}</td>
//            <td style="text-align:center;">${album.album_name}</td>
//            <td style="text-align:center;">${album.album_description}</td>
//            <td style="text-align:center;">${album.album_date}</td>
//            <td style="text-align:center;"><button onclick="showEditForm('${album.album_id}')">Edit</button><button onclick="deleteAlbum('${album.album_id}')">Delete</button></td>
//          `;
//          albumList.appendChild(tr);
//        });
//      })
//      .catch(error => {
//        albumTable.style.display = 'none';
//        console.log('Failed to fetch albums:', error);
//      });
//  } else {
//    // Fetch album by ID from the API
//    fetch(`http://127.0.0.1:5000/album?aid=${search}`)
//      .then(response => response.json())
//      .then(album => {
//        albumTable.style.display = 'block';
//        const albumList = document.getElementById('album-list');
//        albumList.innerHTML = ''; // Clear all data table before adding new data
//
//        const tr = document.createElement('tr');
//        tr.innerHTML = `
//          <td style="text-align:center;">${album.album_id}</td>
//          <td style="text-align:center;">${album.album_name}</td>
//          <td style="text-align:center;">${album.album_description}</td>
//          <td style="text-align:center;">${album.album_date}</td>
//          <td style="text-align:center;"><button onclick="showEditForm('${album.album_id}')">Edit</button><button onclick="deleteAlbum('${album.album_id}')">Delete</button></td>
//        `;
//        albumList.appendChild(tr);
//      })
//      .catch(error => {
//        albumTable.style.display = 'none';
//        console.log('Album not found:', error);
//      });
//  }
//}
//
//function showAddForm() {
//  const addForm = document.getElementById('form-to-add-album');
//  addForm.style.display = 'block';
//}
//
//function showEditForm(albumID) {
//  const editFormContainer = document.getElementById('edit-form-container');
//  const formToPut = document.getElementById('form_to_put_album');
//  formToPut.style.display = 'block';
//
//  const albumIDInput = document.getElementById('album_id_put');
//  const albumNameInput = document.getElementById('album_name_put');
//  const albumDescriptionInput = document.getElementById('album_description_put');
//  const albumDateInput = document.getElementById('album_date_put');
//
//  // Set the album ID in the edit form
//  formToPut.setAttribute('data-album-id', albumID);
//
//  // Fetch album data by ID from the API
//  fetch(`http://127.0.0.1:5000/album?aid=${albumID}`)
//    .then(response => response.json())
//    .then(album => {
//      albumNameInput.value = album.album_name;
//      albumDescriptionInput.value = album.album_description;
//      albumDateInput.value = album.album_date;
//      editFormContainer.style.display = 'block';
//    })
//    .catch(error => {
//      console.log('Failed to fetch album:', error);
//    });
//
//  // Store the albumID in the rememberedAlbumID variable
//  rememberedAlbumID = album_id;
//}
//
//function deleteAlbum(album_id) {
//  // Send a DELETE request to the API with the album ID value
//  fetch(`http://127.0.0.1:5000/album/${album_id}`, {
//    method: 'DELETE',
//    headers: {
//      'Content-Type': 'application/json'
//    }
//  })
//    .then(response => {
//      // If the request is successful, remove the corresponding table row
//      const row = document.querySelector(`#album-list tr[data-album_id="${album_id}"]`);
//      row.parentNode.removeChild(row);
//      const successMessage = document.getElementById('delete-success-message');
//      successMessage.style.display = 'block';
//    })
//    .catch(error => console.error('Failed to delete album:', error));
//}
//
//// Add an event listener to the album list table
//const albumList = document.getElementById('album-list');
//albumList.addEventListener('click', (event) => {
//  const target = event.target;
//  // Check if the clicked element is a delete button
//  if (target.tagName === 'BUTTON' && target.textContent === 'Delete') {
//    const album_id = target.getAttribute('data-album_id');
//    deleteAlbum(album_id);
//    const successMessage = document.getElementById('delete-success-message');
//    successMessage.style.display = 'block';
//    const albumTable = document.getElementById('album-table');
//    albumTable.style.display = 'none';
//    setTimeout(() => {
//      successMessage.style.display = 'none';
//      searchAlbum();
//    }, 1000);
//  }
//});
//
//function handleAddFormSubmit(event) {
//  event.preventDefault();
//
//  const album_id = document.getElementById('album_id').value;
//  const album_name = document.getElementById('album_name').value;
//  const album_description = document.getElementById('album_description').value;
//  const album_date = document.getElementById('album_date').value;
//
//  const albumData = {
//    album_id: album_id,
//    album_name: album_name,
//    album_description: album_description,
//    album_date: album_date
//  };
//
//  fetch('http://127.0.0.1:5000/album?aid=*', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(albumData)
//  })
//    .then(response => response.json())
//    .then(data => {
//      const albumTable = document.getElementById('album-table');
//      const postSuccessMessage = document.getElementById('success-message');
//      postSuccessMessage.style.display = 'block';
//      albumTable.style.display = 'none';
//      form.reset();
//      console.log('Data posted successfully:', data);
//      setTimeout(() => {
//        postSuccessMessage.style.display = 'none';
//        searchAlbum();
//      }, 1000);
//    })
//    .catch(error => {
//      console.error('Error posting data:', error);
//      const postFormContainer = document.getElementById('form-to-add-album');
//      // Display the error message to the user
//      const errorMessage = document.getElementById('error-message');
//      errorMessage.textContent = 'Failed to POST: Please check if the Album ID already exists.' + ' (The main error: ' + error.message + ')';
//      errorMessage.style.display = 'block';
//      postFormContainer.style.display = 'none';
//      const albumTable = document.getElementById('album-table');
//      albumTable.style.display = 'none';
//      setTimeout(() => {
//        postFormContainer.style.display = 'block';
//        errorMessage.style.display = 'none';
//        searchAlbum();
//      }, 2000);
//    });
//}
//
//function handlePutFormSubmit(event) {
//  event.preventDefault();
//
//  const form = document.getElementById('form_to_put_album');
//  const album_id = form.getAttribute('data-album-id');
//  const album_name = document.getElementById('album_name_put').value;
//  const album_description = document.getElementById('album_description_put').value;
//  const album_date = document.getElementById('album_date_put').value;
//
//  const albumData = {
//    album_id: album_id,
//    album_name: album_name,
//    album_description: album_description,
//    album_date: album_date
//  };
//
//  fetch('http://127.0.0.1:5000/album', {
//    method: 'PUT',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(albumData)
//  })
//    .then(response => response.json())
//    .then(data => {
//      const editFormContainer = document.getElementById('edit-form-container');
//      const albumTable = document.getElementById('album-table');
//      const putSuccessMessage = document.getElementById('put-success-message');
//      putSuccessMessage.style.display = 'block';
//      albumTable.style.display = 'none';
//      editFormContainer.style.display = 'none';
//      form.reset();
//      console.log('Data updated successfully:', data);
//      setTimeout(() => {
//        editFormContainer.style.display = 'none';
//        putSuccessMessage.style.display = 'none';
//        searchAlbum();
//      }, 1000);
//    })
//    .catch(error => console.error('Error updating data:', error));
//}
//
//// Attach event listeners
//document.getElementById('show-form-to-add-album').addEventListener('click', showAddForm);
//document.getElementById('form-to-add-album').addEventListener('submit', handleAddFormSubmit);
//document.getElementById('form_to_put_album').addEventListener('submit', handlePutFormSubmit);
