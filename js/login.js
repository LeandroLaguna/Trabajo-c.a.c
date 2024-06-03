document
	.getElementById("loginForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();

		document.getElementById("usernameError").textContent = "";
		document.getElementById("passwordError").textContent = "";
		document.getElementById("loginError").textContent = "";

		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;

		if (!username) {
			document.getElementById("usernameError").textContent =
				"Usuario es requerido.";
			return;
		}

		if (!password) {
			document.getElementById("passwordError").textContent =
				"Contraseña es requerida.";
			return;
		}

		// Obtener datos de sessionStorage
		const storedData = sessionStorage.getItem("userData");
		if (!storedData) {
			document.getElementById("loginError").textContent =
				"No hay usuarios registrados.";
			return;
		}

		const userData = JSON.parse(storedData);

		// Validar credenciales
		if (username === userData.username && password === userData.password) {
			alert("Inicio de sesión exitoso!");
			window.location.href = "../index.html";
		} else {
			document.getElementById("loginError").textContent =
				"Usuario o contraseña incorrectos.";
		}
	});