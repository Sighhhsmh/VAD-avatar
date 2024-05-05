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
            var fftslider = document.getElementById('fftSize');
            analyserNode.fftSize = parseInt(fftslider.value); // Initial value -------------------------------------fftsize variable? [not even connected to the slider]---
            console.log(analyserNode.fftSize);
            var bufferLength = analyserNode.frequencyBinCount;
            var dataArray = new Uint8Array(bufferLength);

            // Initialize the threshold
            var thresholdSlider = document.getElementById('threshold');
            var threshold = parseInt(thresholdSlider.value); //--------------------------------------------threshold variable here-------------------------------
            // console.log('threshold init value:', threshold);
            // Function to periodically check if audio is coming through
            function checkAudio() {
                // Calculate the average audio level
                analyserNode.getByteFrequencyData(dataArray);
                var averageAudioLevel = dataArray.reduce(function (sum, value) {
                    return sum + value;
                }, 0) / bufferLength;

                // Convert to decibels
                var maxLinearValue = 255; // Assuming 8-bit data
                var referenceValue = 1; // Assuming the linear value range is normalized between 0 and 1
                var averageAudioLevel_dB = parseInt(20 * Math.log10(averageAudioLevel / maxLinearValue * referenceValue));

                // var SM = Math.max(parseInt(((averageAudioLevel_dB-threshold)/-threshold)*10), 1);
                var SM = Math.max(parseInt(Math.pow(((averageAudioLevel_dB - threshold) / -threshold), 8) * 100), 1);

                localStorage.setItem('ShakeMultiplier', SM);
                // console.log("Sudio lvl: " + averageAudioLevel_dB + " dB", 'multiplier:', SM);
                
                // Log the result
                // var TM = parseFloat(localStorage.getItem('ThresholdMult'))||0.8; //threshold sensitivity, higher sensitivity=lower audio needed to trigger and vice verse
                var isAudioComingThrough = averageAudioLevel_dB > threshold; // Adjust the multiplier based on your needs
                // console.log('custom multiplier:', TM);
                // Update the status element based on the result
                updateStatus(isAudioComingThrough);

                // Schedule the next frame
                requestAnimationFrame(checkAudio);
            }
            
            // Function to update the status element visibility
            function updateStatus(isAudioComingThrough) {
                // var statusElement = document.getElementById('statusElement');
                if(document.querySelector('.notify')){
                    document.querySelector('.notify').innerText=isAudioComingThrough;}


                if(isAudioComingThrough)
                {
                    document.querySelector('#active').style.opacity="100%";
                    document.querySelector('#inactive').style.opacity="0%";
                    startVibrating(fs);
                    updateVar();
                }
                else
                {
                    document.querySelector('#active').style.opacity="0";
                    document.querySelector('#inactive').style.opacity="100";
                    stopVibrating();
                }
            }

            // Attach event listener to the threshold slider
            thresholdSlider.addEventListener('input', function () {
                threshold = parseInt(thresholdSlider.value); //-------------------------------------------threshold variable.. again?---------------------------------------------------
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







var vibratingDiv = document.getElementById('consolidated');
var vibratingInterval;
var m;
var s;
var x;
var f;
var fs;
var on = false;
function updateVar()
{
    m = parseFloat(localStorage.getItem('FaceShake'))||1.2;
    s = parseInt(localStorage.getItem('ShakeSpeed'))||12;
    x = parseInt(localStorage.getItem('ShakeMultiplier'))||1;
    f = parseFloat((m*x).toFixed(2));
    fs = s/x;
    fs = Math.max(0, Math.min(s, (Math.log(fs + 1) / Math.log(8) / Math.log(s + 1)) * s));
}

function startVibrating(speed) {
    // updateVar();
    // console.log('m', m, 's', s, 'x', x, 'f', f, 'fs', fs, 'outside');

    if(!on)
    {
        on = true;
        // updateVar();
        clearInterval(vibratingInterval);
  
        var posX = 0;
        var posY = 0;
        var rotZ = 0;
        vibratingInterval = setInterval(function() {
            // Update position randomly within a small range
            posX = (Math.random() * 2*f - f).toFixed(2);
            posY = (Math.random() * 3*f - 1.5*f).toFixed(2);
            rotZ = (Math.random() * 2.5*f - f).toFixed(2);
            // console.log('m', m, 's', s, 'f', f, 'fs', fs, 'inside','x', x, );
            // console.log(posX, posY, rotZ);
            // Apply transformation to the div
            vibratingDiv.style.transform = `translate(${posY}rem, ${posX}rem) rotateZ(${rotZ*1.5}deg)`;
        }, speed); // Adjust the speed for desired vibrating speed
    };
};

// Function to stop the vibrating effect
function stopVibrating() {
    if(on)
    {
        clearInterval(vibratingInterval);
        vibratingDiv.style.transform = 'translate(0, 0)';
        on = false;
    };
};

updateVar();


