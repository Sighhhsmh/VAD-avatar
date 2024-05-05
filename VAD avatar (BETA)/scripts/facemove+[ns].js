export var facemove = {
	faceDiv: null,
	draggable: null,
	draggableDiv: null,
	faceIsDragging: false,
	mouthIsDragging: false,
	initialMouseX: 0,
	initialMouseY: 0,
	initialFaceX: 0,
	initialFaceY: 0,
	initialMouthX: 0,
	initialMouthY: 0,

	handleFaceMouseDown: function (e) {
		if (!this.mouthIsDragging && this.faceDiv !== null) {
			this.faceIsDragging = true;

			this.initialMouseX = e.clientX;
			this.initialMouseY = e.clientY;
			this.initialFaceX = this.faceDiv.offsetLeft;
			this.initialFaceY = this.faceDiv.offsetTop;

			document.body.style.cursor = "grabbing";
			document.body.style.userSelect = "none";

			document.addEventListener(
				"mousemove",
				this.handleFaceMouseMove.bind(this)
			);
			document.addEventListener("mouseup", this.handleFaceMouseUp.bind(this));
		}
	},

	handleFaceMouseMove: function (e) {
		if (this.faceIsDragging) {
			const mouseX = e.clientX;
			const mouseY = e.clientY;

			const deltaX = mouseX - this.initialMouseX;
			const deltaY = mouseY - this.initialMouseY;

			let newDivX = this.initialFaceX + deltaX;
			let newDivY = this.initialFaceY + deltaY;

			const maxX = window.innerWidth - this.faceDiv.clientWidth;
			const maxY = window.innerHeight - this.faceDiv.clientHeight;

			var scale = document.getElementById("facesize").value / 10;

			newDivX = Math.max(
				-this.faceDiv.clientWidth / scale,
				Math.min(newDivX, maxX + this.faceDiv.clientWidth / scale)
			);
			newDivY = Math.max(
				-this.faceDiv.clientHeight / scale,
				Math.min(newDivY, maxY + this.faceDiv.clientHeight / scale)
			);

			this.faceDiv.style.left = `${newDivX}px`;
			this.faceDiv.style.top = `${newDivY}px`;
			document.getElementById("consolidated").style.left = `${newDivX}px`;
			document.getElementById("consolidated").style.top = `${newDivY}px`;

			this.initialMouseX = mouseX;
			this.initialMouseY = mouseY;
			this.initialFaceX = newDivX;
			this.initialFaceY = newDivY;
		}
	},

	handleFaceMouseUp: function () {
		if (this.faceIsDragging) {
			this.faceIsDragging = false;

			document.body.style.cursor = "grab";
			document.body.style.userSelect = "auto";

			document.removeEventListener(
				"mousemove",
				this.handleFaceMouseMove.bind(this)
			);
			document.removeEventListener(
				"mouseup",
				this.handleFaceMouseUp.bind(this)
			);

			localStorage.setItem("FaceTop", this.initialFaceY);
			localStorage.setItem("FaceLeft", this.initialFaceX);
		}
	},

	handleMouthMouseDown: function (e) {
		if (this.draggableDiv !== null) {
			this.mouthIsDragging = true;

			this.initialMouseX = e.clientX;
			this.initialMouseY = e.clientY;
			this.initialMouthX = this.draggableDiv.offsetLeft;
			this.initialMouthY = this.draggableDiv.offsetTop;

			document.body.style.cursor = "grabbing";
			document.body.style.userSelect = "none";

			document.addEventListener(
				"mousemove",
				this.handleMouthMouseMove.bind(this)
			);
			document.addEventListener("mouseup", this.handleMouthMouseUp.bind(this));
		}
	},

	handleMouthMouseMove: function (e) {
		if (this.mouthIsDragging) {
			var deltaX = e.clientX - this.initialMouseX;
			var deltaY = e.clientY - this.initialMouseY;

			this.draggableDiv.style.left = this.initialMouthX + deltaX + "px";
			this.draggableDiv.style.top = this.initialMouthY + deltaY + "px";
		}
	},

	handleMouthMouseUp: function () {
		if (this.mouthIsDragging) {
			this.mouthIsDragging = false;

			document.body.style.cursor = "grab";
			document.body.style.userSelect = "auto";

			document.removeEventListener(
				"mousemove",
				this.handleMouthMouseMove.bind(this)
			);
			document.removeEventListener(
				"mouseup",
				this.handleMouthMouseUp.bind(this)
			);

			localStorage.setItem("MouthTop", this.initialMouthY);
			localStorage.setItem("MouthLeft", this.initialMouthX);
		}
	},

	init: function () {
		this.faceDiv = document.getElementById("facegroup");
		this.draggable = document.getElementById("active");
		this.draggableDiv = this.draggable.parentElement;

		this.faceDiv.addEventListener(
			"mousedown",
			this.handleFaceMouseDown.bind(this)
		);
		this.draggable.addEventListener(
			"mousedown",
			this.handleMouthMouseDown.bind(this)
		);
	},

	unload: function () {
		if (this.faceDiv && this.draggable) {
			this.faceDiv.removeEventListener(
				"mousedown",
				this.handleFaceMouseDown.bind(this)
			);
			this.draggable.removeEventListener(
				"mousedown",
				this.handleMouthMouseDown.bind(this)
			);

			document.removeEventListener(
				"mousemove",
				this.handleFaceMouseMove.bind(this)
			);
			document.removeEventListener(
				"mouseup",
				this.handleFaceMouseUp.bind(this)
			);
			document.removeEventListener(
				"mousemove",
				this.handleMouthMouseMove.bind(this)
			);
			document.removeEventListener(
				"mouseup",
				this.handleMouthMouseUp.bind(this)
			);

			this.faceDiv = null;
			this.draggable = null;
			this.draggableDiv = null;
			this.faceIsDragging = false;
			this.mouthIsDragging = false;
			this.initialMouseX = 0;
			this.initialMouseY = 0;
			this.initialFaceX = 0;
			this.initialFaceY = 0;
			this.initialMouthX = 0;
			this.initialMouthY = 0;
		}
	},
};

// document.addEventListener('DOMContentLoaded', function () {
//     facemove.init();
// });

// To unload the script, call the unload method
// facemove.unload();
