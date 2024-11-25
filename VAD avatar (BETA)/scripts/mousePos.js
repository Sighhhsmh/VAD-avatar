window.socket = new WebSocket("ws://localhost:8008");

window.socket.onopen = function (event) {
    console.log("connected to python server");
};

// window.socket.onmessage = function (event) {
//     const data = event.data.split(",");
//     var x, y;
//     x = parseFloat(data[0]);
//     y = parseFloat(data[1]);
//     function(x, y);
//     };



window.socket.onerror = function (error) {
	console.error("WebSocket error:", error);
};

window.socket.onclose = function (event) {
	console.log("Connection closed.");
};
