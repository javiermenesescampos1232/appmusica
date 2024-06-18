const topBar = document.querySelector('.topbar');

window.addEventListener('scroll', () => {
	if (window.scrollY > 0) {
		topBar.classList.add('transparent');
	} else {
		topBar.classList.remove('transparent');
	}
});

let topbarHeight = topBar.offsetHeight;

const mainContent = document.querySelector('.main-content');
mainContent.style.paddingTop = `${topbarHeight + 20}px`;

const containerConcentracion = document.querySelectorAll(
	'.card-concentracion'
);
const containerSpotifyPlaylists = document.querySelectorAll(
	'.card-spotify-playlists'
);
const createButton = card => {
	const button = document.createElement('button');
	button.innerHTML = '<i class="fa-solid fa-play"></i>';

	card.appendChild(button);

	button.style.display = 'none';
	button.classList.add('btn-play');

	card.addEventListener('mouseover', () => {
		button.style.display = 'block';
	});

	card.addEventListener('mouseout', () => {
		button.style.display = 'none';
	});
};

containerConcentracion.forEach(card => {
	createButton(card);
});

containerSpotifyPlaylists.forEach(card => {
	createButton(card);
});

    document.addEventListener('DOMContentLoaded', function () {
        function togglePlayPause(audio) {
            if (audio.paused || audio.ended) {
                audio.play();
            } else {
                audio.pause();
            }
        }

        var playButtons = document.querySelectorAll('.play-button');
        var pauseButtons = document.querySelectorAll('.pause-button');

        playButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                var audio = this.parentElement.querySelector('audio');
                togglePlayPause(audio);
            });
        });

        pauseButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                var audio = this.parentElement.querySelector('audio');
                togglePlayPause(audio);
            });
        });
    });

function search() {

    var searchText = document.getElementById('search-input').value.toLowerCase().trim();
    var cards = document.querySelectorAll('.card-concentracion'); 
    
    cards.forEach(function(card) {
        var title = card.querySelector('h2').textContent.toLowerCase();
        var artist = card.querySelector('h1').textContent.toLowerCase();

        if (title.includes(searchText) || artist.includes(searchText)) {
            card.style.display = 'block'; 
        } else {
            card.style.display = 'none'; 
        }
    });
}
document.getElementById('search-input').addEventListener('input', search);

