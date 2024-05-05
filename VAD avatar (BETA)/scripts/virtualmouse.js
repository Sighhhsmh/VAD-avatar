function virtualmouse() {
    var pad = document.getElementById('pad').getBoundingClientRect();
    var mouse = document.getElementById('mouse');
    var mousepad = document.getElementById('mousepad');
    var MITimer = parseInt(localStorage.getItem('MouseIdleTimeout') || 1000);
    var RA = parseInt(localStorage.getItem('MouseRotationAmount') || 15);

    var h1 = pad.height;
    var w1 = pad.width;
    var h2 = mouse.offsetHeight;
    var w2 = mouse.offsetWidth;

    var fh = (h1 - h2);
    var fw = ((w1 * 1.004) - w2);

    mousepad.style.width = fw + "px";
    mousepad.style.height = fh + "px";

    // document.addEventListener('mousemove', updateMousePosition);
    window.socket.onmessage = function (event) {
		const data = event.data.split(",");
		var x, y;
		x = parseFloat(data[0]);
		y = parseFloat(data[1]);
		updateMousePosition(x, y)
	};

// Define the idle timeout in milliseconds
const idleTimeout = MITimer;

let idleTimer;
let isMouseIdle = false;

function updateMousePosition(x, y) {
    // Clear the idle timer when mouse moves
    clearTimeout(idleTimer);
    isMouseIdle = false;

    // Calculate the center of the screen
    const screenCenterX = screen.width / 2;
    const screenCenterY = screen.height / 2;

    // Calculate the mouse position offset from the center in normalized values [-1, 1]
    const mouseXNormalized = ((x - screenCenterX) / screenCenterX);
    const mouseYNormalized = ((y - screenCenterY) / screenCenterY);

    // Update the virtual position of #mouse relative to .mousepad
    updateMouseInMousepad(mouseXNormalized, mouseYNormalized);

    // Set a timer to check for mouse inactivity
    idleTimer = setTimeout(checkMouseIdle, idleTimeout);
}

function updateMouseInMousepad(xNormalized, yNormalized) {
    const mouseDiv = document.getElementById('mouse');

    // Calculate the position of #mouse using percentage values
    const mouseXPercentage = ((xNormalized + 1) * 50);
    const mouseYPercentage = ((yNormalized + 1) * 50);

    // Adjust mouseYPercentage based on the inverted cosine value with increased Math.PI division based on yPositionRatio
    const cosineValue = Math.cos(xNormalized * Math.PI / (3 + yNormalized * -1)); 
    const mouseYMultiplier = 0.5 + 0.5 * (-cosineValue); // Multiply by -1 to invert the effect

    // Set the position of #mouse with adjusted x and y positions
    mouseDiv.style.left = `${Math.min(Math.max(mouseXPercentage, 0), 100)}%`;
    mouseDiv.style.top = `${Math.min(Math.max(mouseYPercentage + mouseYMultiplier * 20, 0), 100)}%`;

    // Calculate the rotation angle based on xNormalized
    const rotationAngle = xNormalized * RA; // You can adjust the multiplier as needed for the desired rotation effect------------------------------------------------------------------------

    // Apply the rotation to #mouse
    mouseDiv.style.transform = `rotate(${rotationAngle}deg)`;
    mouseDiv.style.transition = 'none';
}

function checkMouseIdle() {
    // Set isMouseIdle to true and reset #mouse position to the center of #pad
    isMouseIdle = true;
    resetMousePosition();
}

function resetMousePosition() {
    const mouseDiv = document.getElementById('mouse');
    const padCenterX = document.getElementById('pad').offsetWidth / 2;
    const padCenterY = document.getElementById('pad').offsetHeight / 2;

    // Set the position of #mouse to the center of #pad
    mouseDiv.style.transition = 'all ease 0.5s';
    mouseDiv.style.left = `${padCenterX}px`;
    mouseDiv.style.top = `${padCenterY}px`;

    // Reset the rotation of #mouse to zero
    mouseDiv.style.transform = 'rotate(0deg)';
}
};

document.addEventListener('DOMContentLoaded', function () {
    virtualmouse();
});