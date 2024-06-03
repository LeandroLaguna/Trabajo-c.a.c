const clientId = "ce8739adefa54bfc91325512bb7ec2c7";
const clientSecret = "a87194b1e58a421eb98e24bf3ae9ed20";

let spotifyPlayer;
let token;

// Obtener el token de Spotify
async function getToken() {
	try {
		const response = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
		});

		if (!response.ok) {
			throw new Error("No se pudo obtener el token de acceso");
		}

		const data = await response.json();
		token = data.access_token;
		return token;
	} catch (error) {
		console.error("Error al obtener el token de acceso:", error);
		throw error;
	}
}

// Buscar y reproducir una canción en Spotify
async function playSongForPlace(place) {
	try {
		const token = await getToken();
		await song(place.toLowerCase(), token);
	} catch (error) {
		console.error("Error al reproducir la canción:", error);
	}
}

// Función para buscar la canción y reproducirla
async function song(place, token) {
	let trackId;

	switch (place) {
		case "etiopia":
			trackId = "57Pl5X7nOYuPoVIw824kQ0?si=094f66884a4645c6"; // ID de la canción específica
			break;
		default:
			console.error("Lugar no reconocido");
			return;
	}

	try {
		const playerDiv = document.getElementById("spotify-player");
		playerDiv.innerHTML = `<iframe id="spotify-iframe" style="border-radius:12px;" src="https://open.spotify.com/embed/track/${trackId}?utm_source=generator" width="300" height="80" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;

		spotifyPlayer = playerDiv.querySelector("iframe");

		// Detectar el estado de reproducción del iframe
		window.addEventListener("message", (event) => {
			if (
				event.origin === "https://open.spotify.com" &&
				event.data &&
				typeof event.data === "string"
			) {
				const message = JSON.parse(event.data);

				if (message.type === "PLAYER_STATE_CHANGED") {
					if (message.state.paused) {
						stopCarousel();
					} else {
						startCarousel();
					}
				}
			}
		});
	} catch (error) {
		console.error("Error en la función song:", error);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const carousel = document.querySelector(".carousel-slide");
	const images = document.querySelectorAll(".carousel-item");

	let counter = 0;

	function nextSlide() {
		counter = (counter + 1) % images.length;
		carousel.style.transform = `translateX(${-counter * 100}%)`;
	}

	function startCarousel() {
		setInterval(nextSlide, 10000);
	}

	function stopCarousel() {
		clearInterval();
	}

	// Reproducir la canción al cargar la página
	playSongForPlace("etiopia");

	// Iniciar el carrusel
	startCarousel();
	stopCarousel();
});