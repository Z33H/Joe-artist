let key = 'c42af41b44f04dd6991a424ee6e8f67c';
let secret = '649181774318464b80bd062cbeb69778';

fetch('https://accounts.spotify.com/api/token', {
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}).then(function (resp) { 

	// Return the response as JSON
	return resp.json();

}).then(function (data) {
	// Log the API data
	console.log('token', data);

	// Return a second API call
	// This one uses the token we received for authentication
	return fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DX5wDmLW735Yd', {
        method: 'GET',
		headers: {
			'Authorization': data.token_type + ' ' + data.access_token,
			'Content-Type': 'application/json'
		}
	}); 

}).then(function (resp) {

	// Return the API response as JSON
	return resp.json();

}).then(function (data) {
    console.log(data);
    displayMusic(data);

}).catch(function (err) {
	// Log any errors
	console.log('something went wrong', err);
});

function displayMusic(data){
    let tracks = data.tracks.items;
    for(let x=0; x < 3; x++){
        console.log(data.tracks.items[x]);
        let track = data.tracks.items[x].track;
        let image = track.album.images[0];
        let name = track.name;
        let previewURL = track.preview_url;
        console.log(image);
        console.log(name);
        console.log(previewURL);
        
        let musicContainer = document.querySelector('[data-music-section]');
        musicContainer.innerHTML = musicContainer.innerHTML + 
        `<div id="musicItem" class="w-full md:w-1/3 p-10" data-music-url="${previewURL}">
            <img id="musicItemImg" src="${image.url}" onmouseover="PlaySound('mySound${x}')" 
            onmouseout="StopSound('mySound${x}')" />
            <audio id='mySound${x}' src='${previewURL}'/>
            <p class="mt-3">${name}</p>            
        </div>`;
    }
}

function PlaySound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.play();
}

function StopSound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.pause();
    thissound.currentTime = 0;
}
