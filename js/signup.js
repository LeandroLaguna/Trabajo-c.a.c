document
	.getElementById("signupForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();

		const username = document.getElementById("username").value;
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		const confirmPassword =
			document.getElementById("confirmPassword").value;

		document.getElementById("usernameError").textContent = "";
		document.getElementById("emailError").textContent = "";
		document.getElementById("passwordError").textContent = "";
		document.getElementById("confirmPasswordError").textContent = "";
		document.getElementById("signupError").textContent = "";

		let isValid = true;

		if (username.trim() === "") {
			document.getElementById("usernameError").textContent =
				"El nombre de usuario es obligatorio.";
			isValid = false;
		}
		if (email.trim() === "") {
			document.getElementById("emailError").textContent =
				"El correo electrónico es obligatorio.";
			isValid = false;
		} else if (!validateEmail(email)) {
			document.getElementById("emailError").textContent =
				"El correo electrónico no es válido.";
			isValid = false;
		}
		if (password.trim() === "") {
			document.getElementById("passwordError").textContent =
				"La contraseña es obligatoria.";
			isValid = false;
		}
		if (confirmPassword.trim() === "") {
			document.getElementById("confirmPasswordError").textContent =
				"Confirmar contraseña es obligatorio.";
			isValid = false;
		} else if (password !== confirmPassword) {
			document.getElementById("confirmPasswordError").textContent =
				"Las contraseñas no coinciden.";
			isValid = false;
		}

		if (isValid) {
			// Guardar datos en sessionStorage
			const userData = {
				username: username,
				email: email,
				password: password,
			};
			sessionStorage.setItem("userData", JSON.stringify(userData));

			alert("Usuario registrado exitosamente!");
			window.location.href = "login.html";
		}
	});

function validateEmail(email) {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(String(email).toLowerCase());
}