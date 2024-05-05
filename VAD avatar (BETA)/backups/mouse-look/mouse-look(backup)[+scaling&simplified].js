function initMouselook() {
    
    document.addEventListener('mousemove', handleMouseMove);
    
    const consolidatedDiv = document.getElementById('consolidated');
    const faceGroupDiv = document.getElementById('facegroup');
    const sphereRadiusX = -20;
    const perspectiveValue = 1000;
    var scale = document.getElementById('facesize').value/100;

    const checkbox = document.getElementById('enableRotation');

    function handleMouseMove(e) {
        if (checkbox.checked) {

            

            // Get the center of the consolidatedDiv
            const rect = consolidatedDiv.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Normalize mouse coordinates to [-1, 1] range centered around the middle of consolidatedDiv
            const normalizedX = ((e.clientX - centerX) / (consolidatedDiv.offsetWidth / 2));
            const normalizedY = -((e.clientY - centerY) / (consolidatedDiv.offsetHeight / 2));

            // Your existing translation calculation remains the same
            const translateX = normalizedX * 150;
            const translateY = -normalizedY * 150;
            const translateZ = 0;

            const maxPitch = Math.PI / 4;
            const maxYaw = Math.PI / 3;
            let pitch = normalizedY * maxPitch;
            let yaw = normalizedX * maxYaw;

            pitch = Math.max(-maxPitch, Math.min(pitch, maxPitch));
            yaw = Math.max(-maxYaw, Math.min(yaw, maxYaw));

            const rotationMatrix = calculateRotationMatrix(pitch, yaw);

            // Apply 3D transformations to consolidatedDiv
            faceGroupDiv.style.transform = `perspective(${perspectiveValue}px) scale(${scale}) translate3d(${translateX}px, ${translateY}px, ${sphereRadiusX + translateZ}px) matrix3d(${rotationMatrix.join(',')})`;

            // Apply rotations to faceGroupDiv
            // faceGroupDiv.style.transform = `rotateX(${pitch}rad) rotateY(${yaw}rad)`;
        }
    }
    checkbox.addEventListener('change', function() {
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
            cosYaw,                             0,                -sinYaw,          0,
            sinPitch * sinYaw,   cosPitch,   sinPitch * cosYaw,   0,
            cosPitch * sinYaw,  -sinPitch,   cosPitch * cosYaw,   0,
            0,                                   0,                              0,   1
          ];

        return matrix;
    }
}
