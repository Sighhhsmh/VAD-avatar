window.onload = function () {
    const consolidatedDiv = document.getElementById('consolidated');
    const sphereRadiusX = 200; // Adjust the radius around the x-axis as needed
    const perspectiveValue = 1000; // Adjust the perspective value as needed
  
    const checkbox = document.getElementById('enableRotation');
  
    function handleMouseMove(e) {
      if (checkbox.checked) {
        // Normalize mouse coordinates to [-1, 1] range
        const normalizedX = (e.clientX / screen.width) * 2 - 1;
        const normalizedY = (e.clientY / screen.height) * -2 + 1;
  
        // Calculate translation amounts based on normalized mouse coordinates
        const translateX = normalizedX * 150; // Adjust the amount as needed
        const translateY = -normalizedY * 150; // Adjust the amount as needed
        const translateZ = 0; // No translation along the z-axis for now
  
        // Calculate rotation angles based on mouse position
        const maxPitch = Math.PI / 4; // Maximum pitch limit (90 degrees)
        const maxYaw = Math.PI / 3;   // Maximum yaw limit (90 degrees)
        let pitch = normalizedY * maxPitch; // Angle around the x-axis
        let yaw = normalizedX * maxYaw;     // Angle around the y-axis
  
        // Clamp pitch and yaw to their respective maximum limits
        pitch = Math.max(-maxPitch, Math.min(pitch, maxPitch));
        yaw = Math.max(-maxYaw, Math.min(yaw, maxYaw));
  
        // Calculate rotation matrix
        const rotationMatrix = calculateRotationMatrix(pitch, yaw);
  
        // Apply 3D transformations with perspective, translation, and rotation matrix
        consolidatedDiv.style.transform = `perspective(${perspectiveValue}px) translate3d(${translateX}px, ${translateY}px, ${sphereRadiusX + translateZ}px) matrix3d(${rotationMatrix.join(',')})`;
      }
    }
  
    // Initial setup: Add or remove the event listener based on the checkbox state
    if (checkbox.checked) {
      document.addEventListener('mousemove', handleMouseMove);
    }
  
    checkbox.addEventListener('change', function() {
      // Add or remove the event listener based on the checkbox state
      if (this.checked) {
        document.addEventListener('mousemove', handleMouseMove);
        consolidatedDiv.style.transition = 'transform 0.5s ease-out';
      } else {
        consolidatedDiv.style.transform = 'perspective(0px) translate3d(0, 0, 0) matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)';
        consolidatedDiv.style.transition = 'none';
        document.removeEventListener('mousemove', handleMouseMove);
      }
    });
  
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
  };
  