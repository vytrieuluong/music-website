//let rememberedSongID = ""; // Variable to store the remembered song ID
//
//function searchSong() {
//  const search = document.getElementById('searched').value;
//  const songTable = document.getElementById('song-table');
//
//  if (search === '*') {
//    // Fetch all songs from the API
//    fetch('http://127.0.0.1:5000/song?sid=*')
//      .then(response => response.json())
//      .then(data => {
//        songTable.style.display = 'block';
//        const songList = document.getElementById('song-list');
//        songList.innerHTML = ''; // Clear all data table before adding new data
//        data.forEach(song => {
//          const tr = document.createElement('tr');
//          tr.innerHTML = `
//            <td style="text-align:center;">${song.song_id}</td>
//            <td style="text-align:center;">${song.song_name}</td>
//            <td style="text-align:center;">${song.type_id}</td>
//            <td style="text-align:center;">${song.song_writer_id}</td>
//            <td style="text-align:center;">${song.listen_count}</td>
//            <td style="text-align:center;">${song.rate}</td>
//            <td style="text-align:center;"><button onclick="showEditForm('${song.song_id}')">Edit</button><button onclick="deleteSong('${song.song_id}')">Delete</button></td>
//          `;
//          songList.appendChild(tr);
//        });
//      })
//      .catch(error => {
//        songTable.style.display = 'none';
//        console.log('Failed to fetch songs:', error);
//      });
//  } else {
//    // Fetch song by ID from the API
//    fetch(`http://127.0.0.1:5000/song?sid=${search}`)
//      .then(response => response.json())
//      .then(song => {
//        songTable.style.display = 'block';
//        const songList = document.getElementById('song-list');
//        songList.innerHTML = ''; // Clear all data table before adding new data
//
//        const tr = document.createElement('tr');
//        tr.innerHTML = `
//          <td style="text-align:center;">${song.song_id}</td>
//          <td style="text-align:center;">${song.song_name}</td>
//          <td style="text-align:center;">${song.type_id}</td>
//          <td style="text-align:center;">${song.song_writer_id}</td>
//          <td style="text-align:center;">${song.listen_count}</td>
//          <td style="text-align:center;">${song.rate}</td>
//          <td style="text-align:center;"><button onclick="showEditForm('${song.song_id}')">Edit</button><button onclick="deleteSong('${song.song_id}')">Delete</button></td>
//        `;
//        songList.appendChild(tr);
//      })
//      .catch(error => {
//        songTable.style.display = 'none';
//        console.log('Song not found:', error);
//      });
//  }
//}
//
//function showAddForm() {
//  const addForm = document.getElementById('form-to-add-song');
//  addForm.style.display = 'block';
//}
//
//function showEditForm(songID) {
//  const editFormContainer = document.getElementById('edit-form-container');
//  const formToPut = document.getElementById('form_to_put_song');
//  formToPut.style.display = 'block';
//
//  const songIDInput = document.getElementById('song_id_put');
//  const songNameInput = document.getElementById('song_name_put');
//  const typeIDInput = document.getElementById('type_id_put');
//  const songWriterIDInput = document.getElementById('song_writer_id_put');
//  const listenCountInput = document.getElementById('listen_count_put');
//  const rateInput = document.getElementById('rate_put');
//
//  // Set the song ID in the edit form
//  formToPut.setAttribute('data-song-id', songID);
//
//  // Fetch song data by ID from the API
//  fetch(`http://127.0.0.1:5000/song?sid=${songID}`)
//    .then(response => response.json())
//    .then(song => {
//      songNameInput.value = song.song_name;
//      typeIDInput.value = song.type_id;
//      songWriterIDInput.value = song.song_writer_id;
//      listenCountInput.value = song.listen_count;
//      rateInput.value = song.rate;
//      editFormContainer.style.display = 'block';
//    })
//    .catch(error => {
//      console.log('Failed to fetch song:', error);
//    });
//
//  // Store the songID in the rememberedSongID variable
//  rememberedSongID = songID;
//}
//
//function deleteSong(songID) {
//  // Send a DELETE request to the API with the song ID value
//  fetch(`http://127.0.0.1:5000/song/${songID}`, {
//    method: 'DELETE',
//    headers: {
//      'Content-Type': 'application/json'
//    }
//  })
//    .then(response => {
//      // If the request is successful, remove the corresponding table row
//      const row = document.querySelector(`#song-list tr[data-song-id="${songID}"]`);
//      row.parentNode.removeChild(row);
//      const successMessage = document.getElementById('delete-success-message');
//      successMessage.style.display = 'block';
//    })
//    .catch(error => console.error('Failed to delete song:', error));
//}
//
//// Add an event listener to the song list table
//const songList = document.getElementById('song-list');
//songList.addEventListener('click', (event) => {
//  const target = event.target;
//  // Check if the clicked element is a delete button
//  if (target.tagName === 'BUTTON' && target.textContent === 'Delete') {
//    const songID = target.getAttribute('data-song-id');
//    deleteSong(songID);
//    const successMessage = document.getElementById('delete-success-message');
//    successMessage.style.display = 'block';
//    const songTable = document.getElementById('song-table');
//    songTable.style.display = 'none';
//    setTimeout(() => {
//      successMessage.style.display = 'none';
//      searchSong();
//    }, 1000);
//  }
//});
//
//function handleAddFormSubmit(event) {
//  event.preventDefault();
//
//  const song_id = document.getElementById('song_id').value;
//  const song_name = document.getElementById('song_name').value;
//  const type_id = document.getElementById('type_id').value;
//  const song_writer_id = document.getElementById('song_writer_id').value;
//  const listen_count = document.getElementById('listen_count').value;
//  const rate = document.getElementById('rate').value;
//
//  const songData = {
//    song_id: song_id,
//    song_name: song_name,
//    type_id: type_id,
//    song_writer_id: song_writer_id,
//    listen_count: listen_count,
//    rate: rate
//  };
//
//  fetch('http://127.0.0.1:5000/song?sid=*', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(songData)
//  })
//    .then(response => response.json())
//    .then(data => {
//      const songTable = document.getElementById('song-table');
//      const postSuccessMessage = document.getElementById('success-message');
//      postSuccessMessage.style.display = 'block';
//      songTable.style.display = 'none';
//      form.reset();
//      console.log('Data posted successfully:', data);
//      setTimeout(() => {
//        postSuccessMessage.style.display = 'none';
//        searchSong();
//      }, 1000);
//    })
//    .catch(error => {
//      console.error('Error posting data:', error);
//      const postFormContainer = document.getElementById('form-to-add-song');
//      // Display the error message to the user
//      const errorMessage = document.getElementById('error-message');
//      errorMessage.textContent = 'Failed to POST: Please check if the Song ID already exists.' + ' (The main error: ' + error.message + ')';
//      errorMessage.style.display = 'block';
//      postFormContainer.style.display = 'none';
//      const songTable = document.getElementById('song-table');
//      songTable.style.display = 'none';
//      setTimeout(() => {
//        postFormContainer.style.display = 'block';
//        errorMessage.style.display = 'none';
//        searchSong();
//      }, 2000);
//    });
//}
//
//function handlePutFormSubmit(event) {
//  event.preventDefault();
//
//  const form = document.getElementById('form_to_put_song');
//  const songID = form.getAttribute('data-song-id');
//  const songName = document.getElementById('song_name_put').value;
//  const typeID = document.getElementById('type_id_put').value;
//  const songWriterID = document.getElementById('song_writer_id_put').value;
//  const listenCount = document.getElementById('listen_count_put').value;
//  const rate = document.getElementById('rate_put').value;
//
//  const songData = {
//    song_id: songID,
//    song_name: songName,
//    type_id: typeID,
//    song_writer_id: songWriterID,
//    listen_count: listenCount,
//    rate: rate
//  };
//
//  fetch('http://127.0.0.1:5000/song', {
//    method: 'PUT',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(songData)
//  })
//    .then(response => response.json())
//    .then(data => {
//      const editFormContainer = document.getElementById('edit-form-container');
//      const songTable = document.getElementById('song-table');
//      const putSuccessMessage = document.getElementById('put-success-message');
//      putSuccessMessage.style.display = 'block';
//      songTable.style.display = 'none';
//      editFormContainer.style.display = 'none';
//      form.reset();
//      console.log('Data updated successfully:', data);
//      setTimeout(() => {
//        editFormContainer.style.display = 'none';
//        putSuccessMessage.style.display = 'none';
//        searchSong();
//      }, 1000);
//    })
//    .catch(error => console.error('Error updating data:', error));
//}
//
//// Attach event listeners
//document.getElementById('show-form-to-add-song').addEventListener('click', showAddForm);
//document.getElementById('form-to-add-song').addEventListener('submit', handleAddFormSubmit);
//document.getElementById('form_to_put_song').addEventListener('submit', handlePutFormSubmit);
