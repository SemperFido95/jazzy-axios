// const { response } = require("express");

console.log('script sourced');

function getArtists() {
    // Axios GET request
    axios.get('/artist').then((response) => {
        // Code that will run on successful response
        // from the server.
        console.log(response);
        // quotesFromServer will be an Array of quotes
        let quotesFromServer = response.data;
        let contentDiv = document.querySelector('#artistTableBody');
        contentDiv.innerHTML = '';
        for(let artist of quotesFromServer) {
            contentDiv.innerHTML += `
                <tr>
                    <td>${artist.name}</td>
                    <td>${artist.born}</td>
                    <td>${artist.died}</td>
                </tr>
            `;
        }
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong.');
    }); // ALWAYS add .catch
}
// TODO Add ajax request for /songs and display on DOM
getArtists();

function getSongs() {
    axios.get('/song').then((response) => {
        console.log(response);
        let songsFromServer = response.data;
        let contentDiv = document.querySelector('#songTableBody');
        contentDiv.innerHTML = '';
        for(let song of songsFromServer) {
            contentDiv.innerHTML += `
                <tr>
                    <td>${song.title}</td>
                    <td>${song.artist}</td>
                </tr>
            `;
        }
    });
}

getSongs();

function submitForm(event) {
    event.preventDefault();
    console.log('form submitted')
    let name = event.target[0].value;
    let born = event.target[1].value;
    let died = event.target[2].value;

    let newArtist = { name, born, died };

    axios.post('/artist', newArtist).then((response) => {
        console.log(response);
        getArtists();
    })
}