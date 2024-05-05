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
            var fftSizeSlider = document.getElementById('fftSize');
           
            // Initialize the threshold
            var thresholdSlider = document.getElementById('threshold');
            var threshold = parseInt(thresholdSlider.value);

            updateSettings(); // Initial settings

            function updateSettings() {
                analyserNode.fftSize = parseInt(fftSizeSlider.value);
                dynamicThreshold = parseInt(dynamicThresholdSlider.value);
            }

            // Attach event listeners to sliders
            fftSizeSlider.addEventListener('input', updateSettings);
            dynamicThresholdSlider.addEventListener('input', updateSettings);

            // Set up the AnalyserNode
            analyserNode.fftSize = 256; // Initial value
            var bufferLength = analyserNode.frequencyBinCount;
            var dataArray = new Uint8Array(bufferLength);

            // Initialize the dynamic threshold
            var dynamicThreshold = 10;

            // Function to periodically check if audio is coming through
            function checkAudio(callback) {
                // Calculate the average audio level
                analyserNode.getByteFrequencyData(dataArray);
                var averageAudioLevel = dataArray.reduce(function (sum, value) {
                    return sum + value;
                }, 0) / bufferLength;

                // Log the result
                var isAudioComingThrough = averageAudioLevel > dynamicThreshold * 0.8; // Adjust the multiplier based on your needs

                // Execute the callback with the boolean result
                callback(isAudioComingThrough);

                // Schedule the next frame
                requestAnimationFrame(function () {
                    checkAudio(callback);
                });
            }

            // Start periodically checking if audio is coming through
            checkAudio(function (isAudioComingThrough) {
                console.log("Audio coming through:", isAudioComingThrough);
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

            });
        })
        .catch(function (err) {
            // Handle errors (e.g., user denied microphone access)
            console.error("Error accessing microphone:", err);
        });
} else {
    console.error("getUserMedia not supported in this browser");
}

// if(document.querySelector('.notify').innerText.trim().toLowerCase() === 'true')
// {
//     document.querySelector('#active').style.visibility ='visible';
//     console.log(document.querySelector('.notify').innerText);
// }
// else if(document.querySelector('.notify').innerText==="false")
// {
//     document.querySelector('#active').style.visibility ='hidden';
//     console.log(document.querySelector('.notify').innerText);
// }
console.log();