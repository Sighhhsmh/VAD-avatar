let x, y;

export function getX() {
    return x;
};
export function getY() {
    return y;
};




const socket = new WebSocket("ws://localhost:8765");

socket.onopen = function (event) {
    console.log("connected to python server");
};

socket.onmessage = function (event) {
    const data = event.data.split(",");
    x = parseFloat(data[0]);
    y = parseFloat(data[1]);
};



socket.onerror = function (error) {
	console.error("WebSocket error:", error);
};

socket.onclose = function (event) {
	console.log("Connection closed.");
};