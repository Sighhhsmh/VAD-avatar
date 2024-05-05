function initMouselook() {
	// document.addEventListener("mousemove", handleMouseMove);
	window.socket.onmessage = function (event) {
		const data = event.data.split(",");
		var x, y;
		x = parseFloat(data[0]);
		y = parseFloat(data[1]);
		handleMouseMove(x, y)
	};

	// const mouthdiv = document.getElementById('draggableDiv');
	const faceGroupDiv = document.getElementById("facegroup");
	const sphereRadiusX = parseInt(localStorage.getItem("SphereRadX") || -20); // Adjust the radius around the x-axis as needed
	const perspectiveValue = parseInt(localStorage.getItem("FacePersp") || 1000); // Adjust the perspective value as needed
	const XMult = parseInt(localStorage.getItem("LookXRange") || 250);
	const YMult = parseInt(localStorage.getItem("LookYRange") || 250);
	const MPLim = parseInt(localStorage.getItem("MaxPitchLimit") || 4);
	const MYLim = parseInt(localStorage.getItem("MaxYawLimit") || 3);
	var scale = document.getElementById("facesize").value / 100;

	const checkbox = document.getElementById("enableRotation");

	function handleMouseMove(x , y) {
        if (checkbox.checked) {



			// Get the center of the consolidatedDiv
			const rect = faceGroupDiv.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			// Normalize mouse coordinates to [-1, 1] range centered around the middle of consolidatedDiv
			const normalizedX = (x - centerX) / screen.width;
			const normalizedY = -((y - centerY) / screen.height);

			// Your existing translation calculation remains the same
			const translateX = normalizedX * XMult; // mouse follow ammount relative to mouse magnitude
			const translateY = -normalizedY * YMult; // Adjust the amount as needed
			const translateZ = -20;

			const maxPitch = Math.PI / MPLim; // Maximum pitch limit
			const maxYaw = Math.PI / MYLim; //Maximum Yaw Limit
			let pitch = normalizedY * maxPitch;
			let yaw = normalizedX * maxYaw;

			pitch = Math.max(-maxPitch, Math.min(pitch, maxPitch));
			yaw = Math.max(-maxYaw, Math.min(yaw, maxYaw));

			const rotationMatrix = calculateRotationMatrix(pitch, yaw);

			// Apply 3D transformations to consolidatedDiv
			faceGroupDiv.style.transform = `perspective(${perspectiveValue}px) scale(${scale}) translate3d(${translateX}px, ${translateY}px, ${
				sphereRadiusX + translateZ
			}px) matrix3d(${rotationMatrix.join(",")})`;
		}
	}
	checkbox.addEventListener("change", function () {
		// Add or remove the event listener based on the checkbox state
		if (!this.checked) {
			faceGroupDiv.style.transform = `perspective(0px) scale(${scale}) translate3d(0, 0, 0) matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`;
		}
	});

	// ... (rest of your existing code)

	function calculateRotationMatrix(pitch, yaw) {
		const cosPitch = Math.cos(pitch);
		const sinPitch = Math.sin(pitch);
		const cosYaw = Math.cos(yaw);
		const sinYaw = Math.sin(yaw);

		const matrix = [
			cosYaw,
			0,
			-sinYaw,
			0,
			sinPitch * sinYaw,
			cosPitch,
			sinPitch * cosYaw,
			0,
			cosPitch * sinYaw,
			-sinPitch,
			cosPitch * cosYaw,
			0,
			0,
			0,
			0,
			1,
		];

		return matrix;
	}
}
