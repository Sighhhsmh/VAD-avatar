window.onload = function () {
  const consolidatedDiv = document.getElementById('consolidated');
  const sphereRadiusX = 200; // Adjust the radius around the x-axis as needed
  const perspectiveValue = 1000; // Adjust the perspective value as needed

  document.addEventListener('mousemove', (e) => {
      // Normalize mouse coordinates to [-1, 1] range
      const normalizedX = (e.clientX / screen.width) * 2 - 1;
      const normalizedY = (e.clientY / screen.height) * -2 + 1;

      // Calculate maximum pitch and yaw based on the normalized mouse coordinates
      const maxPitch = Math.PI / 5; // Maximum pitch limit (90 degrees)
      const maxYaw = Math.PI / 3;   // Maximum yaw limit (90 degrees)

      // Calculate rotation angles based on mouse position
      let pitch = normalizedY * maxPitch; // Angle around the x-axis
      let yaw = normalizedX * maxYaw;     // Angle around the y-axis

      // Clamp pitch and yaw to their respective maximum limits
      pitch = Math.max(-maxPitch, Math.min(pitch, maxPitch));
      yaw = Math.max(-maxYaw, Math.min(yaw, maxYaw));

      // Calculate rotation matrix
      const rotationMatrix = calculateRotationMatrix(pitch, yaw);

      // Apply 3D transformations with perspective and rotation matrix
      consolidatedDiv.style.transform = `perspective(${perspectiveValue}px) translate3d(0, 0, ${sphereRadiusX}px) matrix3d(${rotationMatrix.join(',')})`;
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
