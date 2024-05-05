// Check if the browser supports getUserMedia
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Request access to the user's microphone
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
            // Microphone access granted
            console.log("Microphone access granted");

            // Create an audio context
            var audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // Create a MediaStreamSourceNode and connect it to the microphone stream
            var sourceNode = audioContext.createMediaStreamSource(stream);

            // Create an AnalyserNode to analyze the audio data
            var analyserNode = audioContext.createAnalyser();
            sourceNode.connect(analyserNode);

            // Set up the AnalyserNode
            analyserNode.fftSize = 256; // Initial value
            var bufferLength = analyserNode.frequencyBinCount;
            var dataArray = new Uint8Array(bufferLength);

            // Initialize the threshold
            var thresholdSlider = document.getElementById('threshold');
            var threshold = parseInt(thresholdSlider.value);

            // Function to periodically check if audio is coming through
            function checkAudio() {
                // Calculate the average audio level
                analyserNode.getByteFrequencyData(dataArray);
                var averageAudioLevel = dataArray.reduce(function (sum, value) {
                    return sum + value;
                }, 0) / bufferLength;

                // Log the result
                var isAudioComingThrough = averageAudioLevel > threshold * 0.8; // Adjust the multiplier based on your needs

                // Update the status element based on the result
                updateStatus(isAudioComingThrough);

                // Schedule the next frame
                requestAnimationFrame(checkAudio);
            }

            // Function to update the status element visibility
            function updateStatus(isAudioComingThrough) {
                var statusElement = document.getElementById('statusElement');
                document.querySelector('.notify').innerText=isAudioComingThrough;


                if(isAudioComingThrough)
                {
                    document.querySelector('#active').style.opacity="100%";
                    document.querySelector('#inactive').style.opacity="0%";
                }
                else
                {
                    document.querySelector('#active').style.opacity="0";
                    document.querySelector('#inactive').style.opacity="100";
                }
            }

            // Attach event listener to the threshold slider
            thresholdSlider.addEventListener('input', function () {
                threshold = parseInt(thresholdSlider.value);
            });

            // Start periodically checking if audio is coming through
            checkAudio();
        })
        .catch(function (err) {
            // Handle errors (e.g., user denied microphone access)
            console.error("Error accessing microphone:", err);
        });
} else {
    console.error("getUserMedia not supported in this browser");
}






document.addEventListener('DOMContentLoaded', function () {
    var draggable = document.getElementById('active');
    var draggableDiv = draggable.parentElement;
    var offsetX, offsetY, isDragging = false;

    // Variables to store the initial position
    var initialX, initialY;

    // Event listener for mousedown to start dragging
    draggable.addEventListener('mousedown', function (e) {
        isDragging = true;

        // Store the initial mouse coordinates
        offsetX = e.clientX;
        offsetY = e.clientY;

        // Store the initial position of the draggableDiv
        initialX = draggableDiv.offsetLeft;
        initialY = draggableDiv.offsetTop;

        // Change cursor style and prevent text selection during drag
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
    });

    // Event listener for mousemove to update div position
    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            // Calculate the change in mouse position
            var deltaX = e.clientX - offsetX;
            var deltaY = e.clientY - offsetY;

            // Update the div's position based on the initial position
            draggableDiv.style.left = (initialX + deltaX) + 'px';
            draggableDiv.style.top = (initialY + deltaY) + 'px';
        }
    });

    // Event listener for mouseup to stop dragging
    document.addEventListener('mouseup', function () {
        if (isDragging) {
            // Reset dragging state
            isDragging = false;

            // Restore cursor style and text selection
            document.body.style.cursor = 'grab';
            document.body.style.userSelect = 'auto';
        }
    });
});
